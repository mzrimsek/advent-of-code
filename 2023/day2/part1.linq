<Query Kind="Program">
  <IncludeUncapsulator>false</IncludeUncapsulator>
</Query>

static readonly int RED_MAX = 12;
static readonly int GREEN_MAX = 13;
static readonly int BLUE_MAX = 14;

class GameResult {
	public int Red { get; set; }
	public int Green { get; set; }
	public int Blue { get; set; }
}

class GameInstance {
	public int GameId { get; set; }
	public IEnumerable<GameResult> Results { get; set; }
}

GameResult ProcessGameResult(string game)
{
	var countParts = game.Split(',');
	var blueCountPart = countParts.SingleOrDefault(x => x.ToLower().Contains("blue"));
	var greenCountPart = countParts.SingleOrDefault(x => x.ToLower().Contains("green"));
	var redCountPart = countParts.SingleOrDefault(x => x.ToLower().Contains("red"));

	var blueCount = blueCountPart == null ? 0 : int.Parse(blueCountPart.Replace("blue", string.Empty));
	var greenCount = greenCountPart == null ? 0 : int.Parse(greenCountPart.Replace("green", string.Empty));
	var redCount = redCountPart == null ? 0 : int.Parse(redCountPart.Replace("red", string.Empty));

	return new GameResult
	{
		Blue = blueCount,
		Green = greenCount,
		Red = redCount
	};
}

GameInstance ProcessGame(string line) {
	var halves = line.Split(':');
	var gameId = int.Parse(halves.First().ToLower().Replace("game", string.Empty).Trim());
	var games = halves.Last().Split(';');
	var gameResults = games.Select(ProcessGameResult);
	
	return new GameInstance {
		GameId = gameId,
		Results = gameResults
	};
}

void Main()
{
	var input = File.ReadAllText($"{Util.CurrentQuery.Location}/input.txt");
	var lines = input.Split('\n');
	var gameInstances = lines.Select(line => ProcessGame(line));
	var validGameInstances = gameInstances.Where(gameInstance =>
	{
		var hasBlueIssues = gameInstance.Results.Any(x => x.Blue > BLUE_MAX);
		var hasGreenIssues = gameInstance.Results.Any(x => x.Green > GREEN_MAX);
		var hasRedIssues = gameInstance.Results.Any(x => x.Red > RED_MAX);
		return !hasBlueIssues && !hasGreenIssues && !hasRedIssues;
	});
	var gameIdSum = validGameInstances.Sum(x => x.GameId);
	gameIdSum.Dump();
	
	// answer is 2632
}
