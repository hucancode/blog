---
title: 'Unreal Engine Networking - Session'
subtitle: 'How to use Session to implement a simple game lobby mechanic'
date: 2022-06-21 17:50:00
category: 'ue'
---
## **THIS ARTICLE IS UNDER CONSTRUCTION**

## Introduction
### Feature design
In this article we will build a host game/join game mechanic. Player are allowed to 'host' a game. After that people joining games and start playing.
There are 4 operations we will be implementing here
- Host Game - `Create Session` in UE term
- List Opening Game - `Find Sessions` in UE term
- Join Game - `Join Session` in UE term
- Leave Game - `Destroy Session` in UE term
### Before we begin
#### Make sure you enabled online subsystem plugin
Open `Plugin Settings`, and enable `Online Base`, `Online Subsystem`, `Online Subsystem Utils`. Then enable Steam, or something else according to your case. In this case, I just want to connect over LAN so I went with `Online Subsystem NULL`

Your setting would looks like this
![](ue/networking-session/plugin-setting.png)
#### Set PIE player count to at least 2
We need at least 2 players to test this kind of behavior. By default it's 1, so adjust number of players accordingly. Their `Net Mode` have to be `Standalone`

Your setting would looks like this
![](ue/networking-session/play-setting.png)
## Core functions
### Create session

You can check for Epic's official implementation of `CreateSession` at `Engine\Plugins\Online\OnlineSubsystemUtils\Source\OnlineSubsystemUtils\Private\CreateSessionCallbackProxy.cpp`

We need an `IOnlineSession` object to get going, usually you can get it with `Online::GetSubsystem::GetSessionInterface`. 
In there we pass a player ID, that player would be host player, in this case I use `GetPrimaryPlayerUniqueIdRepl`. 

Customization is done via `FOnlineSessionSettings`.
Note that those settings are pretty fragile, your game might not be found by others if not done correctly.
The options below are confirmed working in `UE 5.0` for creating a LAN game.
```cpp
FOnlineSessionSettings Settings;
Settings.NumPublicConnections = 10;
Settings.bShouldAdvertise = true;
Settings.bAllowJoinInProgress = true;
Settings.bIsLANMatch = true;
Settings.bUsesPresence = true;
Settings.bAllowJoinViaPresence = true;
auto Sessions = Online::GetSubsystem(GetWorld())->GetSessionInterface();
Sessions->CreateSession(*GetPrimaryPlayerUniqueIdRepl(), NAME_GameSession, Settings);
```

### Find session

You can check for Epic's official implementation of `FindSessions` at `Engine\Plugins\Online\OnlineSubsystemUtils\Source\OnlineSubsystemUtils\Private\FindSessionsCallbackProxy.cpp`
Result will be populated to `SessionSearch`
```cpp
// Declare this somewhere in your class property, we will need this in other methods
TSharedRef<FOnlineSessionSearch> SessionSearch;
// Find method
SessionSearch->bIsLanQuery = bIsLAN;
SessionSearch->MaxSearchResults = 20;
SessionSearch->PingBucketSize = 1000;
auto Sessions = Online::GetSubsystem(GetWorld())->GetSessionInterface();
Sessions->FindSessions(*GetPrimaryPlayerUniqueIdRepl(), SessionSearch);
```

### Join session

You can check for Epic's official implementation of `JoinSession` at `Engine\Plugins\Online\OnlineSubsystemUtils\Source\OnlineSubsystemUtils\Private\JoinSessionCallbackProxy.cpp`

```cpp
// Suppose that we want to join the first game we found
int SessionIndexInSearchResults = 0;
FOnlineSessionSearchResult SearchResult = SessionSearch->SearchResults[SessionIndexInSearchResults];
auto Sessions = Online::GetSubsystem(GetWorld())->GetSessionInterface();
Sessions->JoinSession(*GetPrimaryPlayerUniqueIdRepl(), NAME_GameSession, SearchResult);
```
In this example, I made it simple by joining the first game in the result. I don't even bother checking if there the result are empty or not. In real project, you might probably want have an GUI for player to pick a game to join.

### Destroy session
You can check for Epic's official implementation of `DestroySession` at `Engine\Plugins\Online\OnlineSubsystemUtils\Source\OnlineSubsystemUtils\Private\DestroySessionCallbackProxy.cpp`
```cpp
auto Sessions = Online::GetSubsystem(GetWorld())->GetSessionInterface();
if (!Sessions->DestroySession(NAME_GameSession)) {
  GAME_LOG(Display, TEXT("Something went wrong during leaving"));
}
// TravelToHome();
```

## Expose functionality to Blueprint

`// Give working C++ code and screen shot BP scripts`

## Build an user interface

`// UI Screenshot`

## Conclusions

`// Some nice paragraph goes here`

### Learn more
Official documentation: https://docs.unrealengine.com/5.0/en-US/online-subsystem-in-unreal-engine/
