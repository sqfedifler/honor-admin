import { heros } from './hero'
import { Response, Request } from 'express'
import { Hero, Player } from './../src/api/types.d'
import faker from 'faker'
// 模拟玩家数据：
faker.locale = 'zh_CN'

const playerCount = 100
const playerList: Player[] = []

for (let i = 0; i < playerCount; i++) {
  playerList.push({
    id: i + 1,
    accountname: faker.name.findName(),
    nickname: faker.name.findName(),
    avatar: faker.image.avatar(),
    level: faker.random.number(30), // ⽤户等级
    exp: faker.random.number(10000), // ⽤户经验值
    rank: faker.random.number(200), // 排位赛段位
    bravepoints: faker.random.number(1000),
    winningstreak: faker.random.number(30),
    wanttoplay: genWanttoplay()
  })
}

function genWanttoplay() {
  const wanttoplay: Set<Hero> = new Set()
  while (wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.random.number(9)])
  }
  return Array.from(wanttoplay)
}

// 路由实现
export const getPlayers = (req: any, res: any) => {
  /// 从查询参中获取分页，过滤关键词等参数

  const { accountname, page = 1, limit = 10 } = req.query

  const mockList = playerList.filter(item => {
    if (accountname && item.accountname.indexOf(accountname) < 0) {
      return false
    } else {
      return true
    }
  })
  // console.log(mockList);
  let count = 0
  const pageList = mockList.filter((item, index) => {
    if (index < limit * page && index >= limit * (page - 1)) {
      count++
    }
    return index < limit * page && index >= limit * (page - 1)
  })
  // console.log("count", count);
  res.json({
    code: 20000,
    data: {
      total: mockList.length,
      players: pageList
    }
  })
}

export const getPlayer = (req: Request, res: any) => {
  /// 从查询参中获取分页，过滤关键词等参数

  const { id } = req.params
  for (const player of playerList) {
    if (player.id.toString() === id) {
      return res.json({
        code: 2000,
        data: {
          player
        }
      })
    }
  }
  // 没有找到报错
  return res.json({
    code: 70001,
    message: '没有找到相应的玩家信息'
  })
}

export const createPlayer = (req: Request, res: any) => {
  /// 从查询参中获取分页，过滤关键词等参数
  // 新增的英雄数据
  const { player } = req.body

  // 没有找到报错
  return res.json({
    code: 20000,
    data: {
      player
    }
  })
}

export const updatePlayer = (req: Request, res: any) => {
  /// 从查询参中获取分页，过滤关键词等参数
  // 新增的英雄数据
  const { id } = req.params
  const { player } = req.body
  for (const player of playerList) {
    if (player.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }

  // 没有找到报错
  return res.json({
    code: 7001,
    message: '没有找到相应的玩家接口'
  })
}

export const deletePlayer = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}
