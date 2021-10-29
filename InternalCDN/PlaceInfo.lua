-- Loaded by StartGameSharedScript --
pcall(function() game:SetCreatorID(1, Enum.CreatorType.User) end)

pcall(function() game:GetService("SocialService"):SetFriendUrl("http://assetgame.sitetest4.robloxlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=IsFriendsWith&playerid=%lld&userid=%lld") end)
pcall(function() game:GetService("SocialService"):SetBestFriendUrl("http://assetgame.sitetest4.robloxlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=IsBestFriendsWith&playerid=%lld&userid=%lld") end)
pcall(function() game:GetService("SocialService"):SetGroupUrl("http://assetgame.sitetest4.robloxlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=IsInGroup&playerid=%lld&groupid=%lld") end)
pcall(function() game:GetService("SocialService"):SetGroupRankUrl("http://assetgame.sitetest4.robloxlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRank&playerid=%lld&groupid=%lld") end)
pcall(function() game:GetService("SocialService"):SetGroupRoleUrl("http://assetgame.sitetest4.robloxlabs.com/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRole&playerid=%lld&groupid=%lld") end)
pcall(function() game:GetService("GamePassService"):SetPlayerHasPassUrl("Game/GamePass/GamePassHandler.ashx?Action=HasPass&UserID=%lld&PassID=%lld") end)
pcall(function() game:GetService("MarketplaceService"):SetProductInfoUrl("marketplace/productinfo?assetId=%lld") end)
pcall(function() game:GetService("MarketplaceService"):SetDevProductInfoUrl("marketplace/productDetails?productId=%lld") end)
pcall(function() game:GetService("MarketplaceService"):SetPlayerOwnsAssetUrl("ownership/hasasset?userId=%lld&assetId=%lld") end)
pcall(function() game:SetPlaceVersion(0) end)