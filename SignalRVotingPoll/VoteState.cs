using System;
namespace SignalRVotingPoll
{
	public class VoteState
	{
        public bool CheatMode = true;

        public Dictionary<int, int> Votes
        {
            get;
        } = new(new Dictionary<int, int> { { 0, 0 }, { 1, 0 } });
    }
}

