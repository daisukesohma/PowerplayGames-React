import AdImg from "../../assets/img.jpg";
import { CONSTANTS } from "../../utility/constants";

const { C, PG, SG, F, D } = CONSTANTS.FILTERS.NBA;

export const dummyData = [
  {
    cat: C,
    data: [
      {
        playerId: 1,
        playerName: "Nathan McKinnen C",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        injured: true,
        steps: [
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 17, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 2,
        playerName: "Conner McDavid",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPower: true,
        steps: [
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 17, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 3,
        playerName: "Sebastian Aho",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        steps: [
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 17, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 4,
        playerName: "Chris Carpenter",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
      },
    ],
  },
  {
    cat: PG,
    data: [
      {
        playerId: 11,
        playerName: "Nathan McKinnen LW",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 22,
        playerName: "Conner McDavid",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPower: true,
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 33,
        title: "Sebastian Aho",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 44,
        title: "Chris Carpenter",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
      },
    ],
  },
  {
    cat: SG,
    data: [
      {
        playerId: 55,
        title: "Nathan McKinnen RW",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 66,
        title: "Conner McDavid",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPower: true,
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 77,
        playerName: "Sebastian Aho",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 88,
        title: "Chris Carpenter",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
      },
    ],
  },
  {
    cat: F,
    data: [
      {
        playerId: 70,
        title: "Nathan McKinnen D",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 71,
        title: "Conner McDavid",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPower: true,
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 72,
        title: "Sebastian Aho",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 73,
        playerName: "Chris Carpenter",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
      },
    ],
  },
  {
    cat: F,
    data: [
      {
        playerId: 74,
        playerName: "Nathan McKinnen G",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        steps: [
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 75,
        playerName: "Conner McDavid",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPower: true,
        steps: [
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 76,
        title: "Sebastian Aho",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        steps: [
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 799,
        playerName: "Chris Carpenter",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
      },
    ],
  },
  {
    cat: D,
    data: [
      {
        playerId: 78,
        playerName: "Nathan McKinnen TD",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        steps: [
          {
            titles: ["gp", "g", "a", "pts", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["gp", "g", "a", "pts", "sog", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 17, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 79,
        playerName: "Conner McDavid",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPower: true,
        steps: [
          {
            titles: ["gp", "g", "a", "pts", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["gp", "g", "a", "pts", "sog", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 17, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 80,
        playerName: "Tampa Bay Lightening",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        steps: [
          {
            titles: ["gp", "g", "a", "pts", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["gp", "g", "a", "pts", "sog", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 17, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        playerId: 81,
        playerName: "Columbus Blue Jackets",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
      },
    ],
  },
];
