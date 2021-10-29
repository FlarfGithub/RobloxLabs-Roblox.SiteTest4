--Game Monitoring Script Arguments--
local jobid, placeid, userId, immediate = ...

function enableStats()
    game:SetJobsExtendedStatsWindow(30)
end

function disableStats()
    game:SetJobsExtendedStatsWindow(0)
end

function collectStats()
    local measures = {}

    local appendstring = function(name, value)
        local row = "string\t" .. name .. "\t" .. value
        measures[#measures + 1] = row
    end

    local appenddouble = function(name, value)
        local row = "double\t" .. name .. "\t" .. value
        measures[#measures + 1] = row
    end

    local extendedstats = game:GetJobsExtendedStats()
    -- some known column headers.
    local NAME = 1
    local columnnames = extendedstats[1]

    -- setup index of running jobs.
    -- fist row is header. start at 2.
    local taskmap = {}
    for i = 2, #(extendedstats) do
        taskmap[extendedstats[i][NAME]] = i
    end

    local appendtask = function(taskname)
        if taskmap[taskname] then
            local taskdata = extendedstats[taskmap[taskname]]

            for col = 2, #taskdata do
                appenddouble(taskname .. "." .. columnnames[col], taskdata[col])
            end
        end
    end

    appendtask("Physics")
    appendtask("Render")
    appendtask("Heartbeat")

    local player = game:GetService("Players").LocalPlayer
    if player then
        appenddouble("UserId", game:GetService("Players").LocalPlayer.userId)
    end

    if jobid then
        appendstring("JobId", jobid)
    end

    if placeid then
        appenddouble("PlaceId", placeid)
    end

    appenddouble("DistributedGameTime", game.Workspace.DistributedGameTime)

    if taskmap["Render"] then
        appenddouble("Render.interval.peakAbove40ms", game:GetJobIntervalPeakFraction("Render", 0.040))
        appenddouble("Render.time.peakAbove50ms", game:GetJobTimePeakFraction("Render", 0.050))
    end
    if taskmap["Physics"] then
        appenddouble("Physics.interval.peakAbove40ms", game:GetJobIntervalPeakFraction("Physics", 0.040))
        appenddouble("Physics.time.peakAbove50ms", game:GetJobTimePeakFraction("Physics", 0.050))
    end

    if stats():FindFirstChild("Network") then
        for k, child in pairs(stats().Network:GetChildren()) do
            local rpackets = child:FindFirstChild("Received Physics Packets")
            if rpackets then
                appenddouble("Network." .. tostring(child) .. ".ReceivedPhysicsPackets", rpackets:GetValue())
            end
        end
    end

    if stats():FindFirstChild("Workspace") then
        appenddouble("Workspace.FPS", stats().Workspace.FPS:GetValue())
        appenddouble("Workspace.World.Primitives", stats().Workspace.World.Primitives:GetValue())
    end

    appenddouble("ElapsedTime", settings().Diagnostics.ElapsedTime)
    appenddouble("InstanceCount", settings().Diagnostics.InstanceCount)
    appenddouble("JobCount", settings().Diagnostics.JobCount)
    appenddouble("PrivateBytes", settings().Diagnostics.PrivateBytes)
    appenddouble("ProcessCores", settings().Diagnostics.ProcessCores)
    appendstring("RobloxVersion", settings().Diagnostics.RobloxVersion)

    -- these can be gleaned from the machine config as well, but they are put here for convenience.
    appenddouble("RAM", settings().Diagnostics.RAM)
    appendstring("CPU", settings().Diagnostics.CPU)
    appenddouble("CpuCount", settings().Diagnostics.CpuCount)

    -- TODO: remove pcall and OsPlatformId once OsPlatform is deployed everywhere
    pcall(
        function()
            appendstring("OsPlatform", settings().Diagnostics.OsPlatform)
        end
    )
    appenddouble("OsPlatformId", settings().Diagnostics.OsPlatformId)

    appenddouble("PlayerCount", game.Players.NumPlayers)

    return measures
end

function postStats(t)
    local poststring = table.concat(t, "\n")
    local player = game:GetService("Players").LocalPlayer
    local id = 0
    local idtype = "None"
    if player then
        idtype = "PlayerId"
        id = game:GetService("Players").LocalPlayer.userId
    end
    if placeid then
        idtype = "PlaceId"
        id = placeid
    end

    local url =
        game:GetService("ContentProvider").BaseUrl ..
        "/Analytics/Measurement.ashx?Type=Game.Performance&IPFilter=primary&SecondaryFilterName=" ..
            idtype .. "&SecondaryFilterValue=" .. tostring(id)
    game:HttpPost(url, poststring, false)
end

enableStats()

-- lua doesn't have built in xor!
-- use this multiplication-based munger instead.
function munge_words(a, b)
    return ((a * b) / 0x100) % 0x10000
end

function collectAndPostStatsMaybe()
    local shouldPostProb = 1.0 / 64.0
    local shouldPost = (math.random() < shouldPostProb)

    if jobid then
        -- generate a "random" number from the guid.
        local s = {
            string.match(jobid, "(%x%x%x%x)(%x%x%x%x)-(%x%x%x%x)-(%x%x%x%x)-(%x%x%x%x)-(%x%x%x%x)(%x%x%x%x)(%x%x%x%x)")
        }
        local w = 0x0100 -- this is the identity value for munge_words
        for i = 1, #s do
            w = munge_words(w, tonumber(s[i], 16))
        end
        shouldPost = w < 0x10000 * shouldPostProb
    end

    if shouldPost then
        postStats(collectStats())
    end
end

if immediate then
    postStats(collectStats())
else
    delay(
        1 * 60,
        function()
            while true do
                collectAndPostStatsMaybe()
                wait(10 * 60)
            end
        end
    )
end

function postFrmStats(t, id)
    local poststring = table.concat(t, "\n")
    local idtype = "PlayerId"

    local url =
        game:GetService("ContentProvider").BaseUrl ..
        "/Analytics/Measurement.ashx?Type=Game.Performance.FrameRateManager&IPFilter=primary&SecondaryFilterName=" ..
            idtype .. "&SecondaryFilterValue=" .. tostring(id)
    game:HttpPost(url, poststring, false)
end

-- Some sampling condition based on userId
if userId then
    if (userId % 100) == 0 then
        local frm = stats():FindFirstChild("FrameRateManager")
        local closeConnection =
            game.Close:Connect(
            function()
                pcall(
                    function()
                        local measures = {}

                        local appenddouble = function(name, value)
                            local row = "double\t" .. name .. "\t" .. value
                            measures[#measures + 1] = row
                        end

                        if frm then
                            frm:GetValue()
                            for k, child in pairs(frm:GetChildren()) do
                                appenddouble(child.Name, child:GetValue())
                            end
                        end
                        postFrmStats(measures, userId)
                        postStats(collectStats())
                    end
                )
            end
        )
    end
end
