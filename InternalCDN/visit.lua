-- Prepended to Edit.lua and Visit.lua and Studio.lua and PlaySolo.lua--

function ifSeleniumThenSetCookie(key, value)
	if false then
		game:GetService("CookiesService"):SetCookieValue(key, value)
	end
end

ifSeleniumThenSetCookie("SeleniumTest1", "Inside the visit lua script")

pcall(function() game:SetPlaceID(0) end)

visit = game:GetService("Visit")

local message = Instance.new("Message")
message.Parent = workspace
message.archivable = false

game:GetService("ScriptInformationProvider"):SetAssetUrl("http://assetgame.sitetest4.robloxlabs.com/Asset/")
game:GetService("ContentProvider"):SetThreadPool(16)
pcall(function() game:GetService("InsertService"):SetFreeModelUrl("http://assetgame.sitetest4.robloxlabs.com/Game/Tools/InsertAsset.ashx?type=fm&q=%s&pg=%lld&rs=%lld") end) -- Used for free model search (insert tool)
pcall(function() game:GetService("InsertService"):SetFreeDecalUrl("http://assetgame.sitetest4.robloxlabs.com/Game/Tools/InsertAsset.ashx?type=fd&q=%s&pg=%lld&rs=%lld") end) -- Used for free decal search (insert tool)

ifSeleniumThenSetCookie("SeleniumTest2", "Set URL service")

settings().Diagnostics:LegacyScriptMode()

game:GetService("InsertService"):SetBaseSetsUrl("http://assetgame.sitetest4.robloxlabs.com/Game/Tools/InsertAsset.ashx?nsets=10&type=base")
game:GetService("InsertService"):SetUserSetsUrl("http://assetgame.sitetest4.robloxlabs.com/Game/Tools/InsertAsset.ashx?nsets=20&type=user&userid=%lld")
game:GetService("InsertService"):SetCollectionUrl("http://assetgame.sitetest4.robloxlabs.com/Game/Tools/InsertAsset.ashx?sid=%lld")
game:GetService("InsertService"):SetAssetUrl("http://assetgame.sitetest4.robloxlabs.com/Asset/?id=%lld")
game:GetService("InsertService"):SetAssetVersionUrl("http://assetgame.sitetest4.robloxlabs.com/Asset/?assetversionid=%lld")

-- TODO: move this to a text file to be included with other scripts
pcall(function() game:GetService("SocialService"):SetFriendUrl("http://assetgame.sitetest4.robloxlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=IsFriendsWith&playerid=%lld&userid=%lld") end)
pcall(function() game:GetService("SocialService"):SetBestFriendUrl("http://assetgame.sitetest4.robloxlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=IsBestFriendsWith&playerid=%lld&userid=%lld") end)
pcall(function() game:GetService("SocialService"):SetGroupUrl("http://assetgame.sitetest4.robloxlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=IsInGroup&playerid=%lld&groupid=%lld") end)
pcall(function() game:GetService("SocialService"):SetGroupRankUrl("http://assetgame.sitetest4.robloxlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRank&playerid=%lld&groupid=%lld") end)
pcall(function() game:GetService("SocialService"):SetGroupRoleUrl("http://assetgame.sitetest4.robloxlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRole&playerid=%lld&groupid=%lld") end)
pcall(function() game:GetService("GamePassService"):SetPlayerHasPassUrl("http://api.sitetest4.robloxlabs.com/Game/GamePass/GamePassHandler.ashx?Action=HasPass&UserID=%lld&PassID=%lld") end)
pcall(function() game:GetService("MarketplaceService"):SetProductInfoUrl("http://api.roblox.com/marketplace/productinfo?assetId=%lld") end)
pcall(function() game:GetService("MarketplaceService"):SetDevProductInfoUrl("http://api.roblox.com/marketplace/productDetails?productId=%lld") end)
pcall(function() game:GetService("MarketplaceService"):SetPlayerOwnsAssetUrl("http://api.roblox.com/ownership/hasasset?userId=%lld&assetId=%lld") end)
pcall(function() game:SetCreatorID(0, Enum.CreatorType.User) end)

ifSeleniumThenSetCookie("SeleniumTest3", "Set creator ID")

pcall(function() game:SetScreenshotInfo("") end)
pcall(function() game:SetVideoInfo("") end)

function registerPlay(key)
	if true and game:GetService("CookiesService"):GetCookieValue(key) == "" then
		game:GetService("CookiesService"):SetCookieValue(key, "{ \"userId\" : 1, \"placeId\" : 0, \"os\" : \"" .. settings().Diagnostics.OsPlatform .. "\" }")
	end
end

pcall(function()
	registerPlay("rbx_evt_ftp")
	delay(60*5, function() registerPlay("rbx_evt_fmp") end)
end)

ifSeleniumThenSetCookie("SeleniumTest4", "Exiting SingleplayerSharedScript")-- SingleplayerSharedScript.lua inserted here --

pcall(function() settings().Rendering.EnableFRM = true end)
pcall(function() settings()["Task Scheduler"].PriorityMethod = Enum.PriorityMethod.AccumulatedError end)

game:GetService("ChangeHistoryService"):SetEnabled(false)
pcall(function() game:GetService("Players"):SetBuildUserPermissionsUrl("http://assetgame.sitetest4.robloxlabs.com/Game/BuildActionPermissionCheck.ashx?assetId=0&userId=%lld&isSolo=true") end)

workspace:SetPhysicsThrottleEnabled(true)

local addedBuildTools = false
local screenGui = game:GetService("CoreGui"):FindFirstChild("RobloxGui")

local inStudio = false or false

function doVisit()
	message.Text = "Loading Game"
	if false then
		if false then
			success, err = pcall(function() game:Load("") end)
			if not success then
				message.Text = "Could not teleport"
				return
			end
		end
	else
		if false then
			game:Load("")
			pcall(function() visit:SetUploadUrl("") end)
		else
			pcall(function() visit:SetUploadUrl("") end)
		end
	end

	message.Text = "Running"
	game:GetService("RunService"):Run()

	message.Text = "Creating Player"
	if false then
		player = game:GetService("Players"):CreateLocalPlayer(1)
		if not inStudio then
			player.Name = [====[Balls]====]
		end
	else
		player = game:GetService("Players"):CreateLocalPlayer(1)
	end
	player.CharacterAppearance = "http://assetgame.sitetest4.robloxlabs.com/Asset/AvatarAccoutrements.ashx?userId=73038160&placeId=0"
	local propExists, canAutoLoadChar = false
	propExists = pcall(function()  canAutoLoadChar = game.Players.CharacterAutoLoads end)

	if (propExists and canAutoLoadChar) or (not propExists) then
		player:LoadCharacter()
	end
	
	message.Text = "Setting GUI"
	player:SetSuperSafeChat(true)
	pcall(function() player:SetUnder13(false) end)
	pcall(function() player:SetMembershipType(Enum.MembershipType.OutrageousBuildersClub) end)
	pcall(function() player:SetAccountAge(0) end)
	if not inStudio and false then
		message.Text = "Setting Ping"
		visit:SetPing("http://assetgame.sitetest4.robloxlabs.com/Game/ClientPresence.ashx?version=old&PlaceID=0", 120)

		message.Text = "Sending Stats"
		game:HttpGet("http://assetgame.sitetest4.robloxlabs.com/Game/Statistics.ashx?UserID=0&AssociatedCreatorID=&AssociatedCreatorType=User&AssociatedPlaceID=0")
	end
	
end

success, err = pcall(doVisit)

if not inStudio and not addedBuildTools then
	local playerName = Instance.new("StringValue")
	playerName.Name = "PlayerName"
	playerName.Value = player.Name
	playerName.RobloxLocked = true
	playerName.Parent = screenGui
				
	pcall(function() game:GetService("ScriptContext"):AddCoreScript(27,screenGui,"BuildToolsScript") end)
	addedBuildTools = true
end

if success then
	message.Parent = nil
else
	print(err)
	if not inStudio then
		if false then
			pcall(function() visit:SetUploadUrl("") end)
		end
	end
	wait(5)
	message.Text = "Error on visit: " .. err
	if not inStudio then
		if false then
			game:HttpPost("http://assetgame.sitetest4.robloxlabs.com/Error/Lua.ashx?", "Visit.lua: " .. err)
		end
	end
end

