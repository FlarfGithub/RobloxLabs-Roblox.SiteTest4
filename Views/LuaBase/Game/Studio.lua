--URL stuff
local UrlBase = game:GetService("ContentProvider").BaseUrl
local ApiProxyUrl = "http://api." .. UrlBase:match("^http://(.-)/?$") --Returns "roblonium.com" by sheering all of those extra bits
local RBXUrl = "http://<%= urlMetadata.Hosts.BaseHost %>"

-- (7/26/2020) All RBXUrls have been switched to UrlBase since internal support for set API has been implemented.

pcall(
    function()
        game:GetService("InsertService"):SetFreeModelUrl(
            UrlBase .. "/Game/Tools/InsertAsset.ashx?type=fm&q=%s&pg=%d&rs=%d"
        )
    end
)
pcall(
    function()
        game:GetService("InsertService"):SetFreeDecalUrl(
            UrlBase .. "/Game/Tools/InsertAsset.ashx?type=fd&q=%s&pg=%d&rs=%d"
        )
    end
)

game:GetService("ScriptInformationProvider"):SetAssetUrl(RBXUrl .. "/Asset/")
game:GetService("InsertService"):SetBaseSetsUrl(UrlBase .. "/Game/Tools/InsertAsset.ashx?nsets=10&type=base")
game:GetService("InsertService"):SetUserSetsUrl(UrlBase .. "/Game/Tools/InsertAsset.ashx?nsets=20&type=user&userid=%d")
game:GetService("InsertService"):SetCollectionUrl(UrlBase .. "/Game/Tools/InsertAsset.ashx?sid=%d")
game:GetService("InsertService"):SetAssetUrl(UrlBase .. "/Asset/?id=%d")
game:GetService("InsertService"):SetAssetVersionUrl(RBXUrl .. "/Asset/?assetversionid=%d")

pcall(
    function()
        game:GetService("SocialService"):SetFriendUrl(
            UrlBase .. "/Game/LuaWebService/HandleSocialRequest.ashx?method=IsFriendsWith&playerid=%d&userid=%d"
        )
    end
)
pcall(
    function()
        game:GetService("SocialService"):SetBestFriendUrl(
            UrlBase .. "/Game/LuaWebService/HandleSocialRequest.ashx?method=IsBestFriendsWith&playerid=%d&userid=%d"
        )
    end
)
pcall(
    function()
        game:GetService("SocialService"):SetGroupUrl(
            UrlBase .. "/Game/LuaWebService/HandleSocialRequest.ashx?method=IsInGroup&playerid=%d&groupid=%d"
        )
    end
)
pcall(
    function()
        game:GetService("SocialService"):SetGroupRankUrl(
            UrlBase .. "/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRank&playerid=%d&groupid=%d"
        )
    end
)
pcall(
    function()
        game:GetService("SocialService"):SetGroupRoleUrl(
            UrlBase .. "/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRole&playerid=%d&groupid=%d"
        )
    end
)
pcall(
    function()
        game:GetService("GamePassService"):SetPlayerHasPassUrl(
            UrlBase .. "/Game/GamePass/GamePassHandler.ashx?Action=HasPass&UserID=%d&PassID=%d"
        )
    end
)
pcall(
    function()
        game:GetService("MarketplaceService"):SetProductInfoUrl(ApiProxyUrl .. "/marketplace/productinfo?assetId=%d")
    end
)
pcall(
    function()
        game:GetService("MarketplaceService"):SetPlayerOwnsAssetUrl(
            ApiProxyUrl .. "/ownership/hasasset?userId=%d&assetId=%d"
        )
    end
)

local result =
    pcall(
    function()
        game:GetService("ScriptContext"):AddStarterScript(1)
    end
)
if not result then
    pcall(
        function()
            game:GetService("ScriptContext"):AddCoreScript(1, game:GetService("ScriptContext"), "StarterScript")
        end
    )
end

local minecraftMusic = false --MINECRAFT

if minecraftMusic == true then
    while true do --Minecraft music lol
        wait(60)
        if math.random(0, 100) < 20 then
            if workspace:FindFirstChild("StudioSound") == nil then
                StudioSound = Instance.new("Sound")
                StudioSound.Name = "StudioSound"
            else
                StudioSound = workspace.StudioSound
            end
            if StudioSound.IsPlaying ~= true then
                StudioSound.Pitch = 1
                StudioSound.Volume = 0
                StudioSound.SoundId = UrlBase .. "/Asset?id=" .. math.random(91, 96)
                StudioSound.Parent = workspace
                StudioSound.Archivable = false
                i = 0
                while i ~= 4 do
                    StudioSound:Play()
                    StudioSound:Stop()
                    i = i + 1
                end
                StudioSound.Volume = 1
                while StudioSound.IsPlaying ~= true do
                    StudioSound:Play()
                end
            end
        end
    end
end
