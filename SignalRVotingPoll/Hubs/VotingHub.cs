using System;
using Microsoft.AspNetCore.SignalR;

namespace SignalRVotingPoll.Hubs
{
	public class VotingHub : Hub
	{
        private readonly VoteState _voteState;

        public VotingHub(VoteState voteState)
        {
            _voteState = voteState;
        }

        public async Task DisableCheatMode()
        {
            _voteState.CheatMode = false;
            _voteState.Votes[0] = 0;
            _voteState.Votes[1] = 0;

            await Clients.All.SendAsync("Reset", _voteState.Votes);
            await Clients.All.SendAsync("UpdateVotes", _voteState.Votes);
        }

        public async Task SendVote(int option)
        {
            // TODO implement server-side user identification to prevent duplicate votes

            int opt = option;

            if (_voteState.CheatMode)
                opt = 0;

            _voteState.Votes[opt]++;

            await Clients.All.SendAsync("UpdateVotes", _voteState.Votes);
        }
    }
}

