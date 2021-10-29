-- Loaded by StartGameSharedScript --
pcall(function() game:SetCreatorID(<%= placeData.Creator.ID %>, Enum.CreatorType.<%= placeData.Creator.CreatorType %>) end)

pcall(function() game:GetService("SocialService"):SetFriendUrl("http://<%= urlMetadata.Hosts.AssetGameHost %><%= urlMetadata.RawPaths.LuaWebService.FriendUrl %>") end)
pcall(function() game:GetService("SocialService"):SetBestFriendUrl("http://<%= urlMetadata.Hosts.AssetGameHost %><%= urlMetadata.RawPaths.LuaWebService.BestFriendUrl %>") end)
pcall(function() game:GetService("SocialService"):SetGroupUrl("http://<%= urlMetadata.Hosts.AssetGameHost %><%= urlMetadata.RawPaths.LuaWebService.GroupUrl %>") end)
pcall(function() game:GetService("SocialService"):SetGroupRankUrl("http://<%= urlMetadata.Hosts.AssetGameHost %><%= urlMetadata.RawPaths.LuaWebService.GroupRankUrl %>") end)
pcall(function() game:GetService("SocialService"):SetGroupRoleUrl("http://<%= urlMetadata.Hosts.AssetGameHost %><%= urlMetadata.RawPaths.LuaWebService.GroupRoleUrl %>") end)
pcall(function() game:GetService("GamePassService"):SetPlayerHasPassUrl("<%= urlMetadata.RawPaths.HasPassUrl %>") end)
pcall(function() game:GetService("MarketplaceService"):SetProductInfoUrl("<%= urlMetadata.RawPaths.ProductInfoUrl %>") end)
pcall(function() game:GetService("MarketplaceService"):SetDevProductInfoUrl("<%= urlMetadata.RawPaths.DeveloperProductDetailsUrl %>") end)
pcall(function() game:GetService("MarketplaceService"):SetPlayerOwnsAssetUrl("<%= urlMetadata.RawPaths.PlayerOwnsAssetUrl %>") end)
pcall(function() game:SetPlaceVersion(<%= placeData.CurrentVersion %>) end)