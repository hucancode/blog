---
title: 'Unreal Engine Networking - Session'
subtitle: 'How to use Session to implement a simple game lobby mechanic'
date: 2022-06-21 17:50:00
category: 'ue'
---

## Introduction

`// Cool intro goes here`
### Make sure you enabled online subsystem plugin
`// Super detail about how to enable online subsystem`
## Feature design
`// Explain why we need CreateSession, FindSessions, JoinSessions, DestroySession`
## Core functions
### Create Session

You can check for Epic's official implementation of `CreateSession` at `Engine\Plugins\Online\OnlineSubsystemUtils\Source\OnlineSubsystemUtils\Private\CreateSessionCallbackProxy.cpp`
We need an `IOnlineSession` object to get going, usually you can get it with `Online::GetSubsystem::GetSessionInterface`. In there we pass a player ID, that player would be host player, in this case I use `GetPrimaryPlayerUniqueIdRepl`. With `FOnlineSessionSettings`, you can customize the session to your liking.
```c#
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

### Find Session

You can check for Epic's official implementation of `FindSessions` at `Engine\Plugins\Online\OnlineSubsystemUtils\Source\OnlineSubsystemUtils\Private\FindSessionsCallbackProxy.cpp`
Result will be added to `SessionSearch`
```c++
// Declare this somewhere in your class property
TSharedRef<FOnlineSessionSearch> SessionSearch;
// Find method
SessionSearch->bIsLanQuery = bIsLAN;
SessionSearch->MaxSearchResults = 20;
SessionSearch->PingBucketSize = 1000;
auto Sessions = Online::GetSubsystem(GetWorld())->GetSessionInterface();
Sessions->FindSessions(*GetPrimaryPlayerUniqueIdRepl(), SessionSearch);
```

### Join Session

You can check for Epic's official implementation of `JoinSession` at `Engine\Plugins\Online\OnlineSubsystemUtils\Source\OnlineSubsystemUtils\Private\JoinSessionCallbackProxy.cpp`

```c++
// Suppose we want to join the first game we found
int SessionIndexInSearchResults = 0;
FOnlineSessionSearchResult SearchResult = SessionSearch->SearchResults[SessionIndexInSearchResults];
auto Sessions = Online::GetSubsystem(GetWorld())->GetSessionInterface();
Sessions->JoinSession(*GetPrimaryPlayerUniqueIdRepl(), NAME_GameSession, SearchResult);
```
### Destroy Session
You can check for Epic's official implementation of `JoinSession` at `Engine\Plugins\Online\OnlineSubsystemUtils\Source\OnlineSubsystemUtils\Private\JoinSessionCallbackProxy.cpp`
```c++
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
