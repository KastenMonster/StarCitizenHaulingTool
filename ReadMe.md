# Star Citizen Hauling Tool

This tool helps you find the best hauling route from over 100+ missions currently available in-game.

## FAQ

#### Where can I find it?

You can find the current version [here](https://kastenmonster.github.io/StarCitizenHaulingTool/) hosted on GitHub Pages. You also have the option to build the website yourself.

### Submit Feedback?

You're free to open a issue here on Github with your feedback

Feel free to open an issue here on GitHub, or submit a fix directly via a pull request.

## What this tool is/isn't

### What this tool is

This tool is designed to be simple. It scans through all available missions and finds the ones with the most matches. Additionally, it searches for missions that are part of a "Master Mission." For example, if the tool finds a "Master Mission" with the following details:

| Origin        | Destination      |
|:-------------:|:----------------:|
| Port Tressler | Int. Spacestation |
| Harbor Spacestation | Pyro Gateway |

It will also display missions that involve combinations like *Port Tressler - Pyro Gateway* or other similar routes.

The tool includes a detailed mode that allows you to factor in the price and SCU of each mission. Using these details, it ranks each mission (that was selected in the initial scan) based on *price per SCU*. The tool will then sum up the missions until the specified ship SCU is filled.

### What this tool isn't

Due to the number of hauling missions currently in the game, this tool does not attempt to solve the traveling salesman problem. Therefore, it does not link or combine *Origin-Destination-Origin* routes to maximize values.

## Authors

- [@KastenMonster](https://www.github.com/kastenmonster)

## License

[GNU GPL v.3](https://choosealicense.com/licenses/gpl-3.0/)
