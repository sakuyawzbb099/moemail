import { createDb } from "@/lib/db"
import { users, userRoles, roles } from "@/lib/schema"
import { checkPermission } from "@/lib/auth"
import { PERMISSIONS } from "@/lib/permissions"
import { eq, desc, lt, and, or } from "drizzle-orm"

export const runtime = "edge"

const PAGE_SIZE = 50

interface UserWithRole {
  id: string
  name: string | null
  username: string | null
  email: string | null
  role: string | null
  createdAt?: Date
}

export async function GET(request: Request) {
  try {
    // 需要管理员权限
    const hasPermission = await checkPermission(PERMISSIONS.MANAGE_CONFIG)
    if (!hasPermission) {
      return Response.json({ error: "权限不足，需要管理员权限" }, { status: 403 })
    }

    const db = createDb()
    const { searchParams } = new URL(request.url)
    const cursor = searchParams.get('cursor')
    const searchText = searchParams.get('search')

    // 构建基础查询条件
    let whereConditions = []

    if (searchText) {
      whereConditions.push(
        or(
          new (require("drizzle-orm").SQL)`${users.username} LIKE ${`%${searchText}%`}`,
          new (require("drizzle-orm").SQL)`${users.email} LIKE ${`%${searchText}%`}`,
          new (require("drizzle-orm").SQL)`${users.name} LIKE ${`%${searchText}%`}`
        )
      )
    }

    // 获取所有用户及其角色信息
    let userList = await db.query.users.findMany({
      where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
      with: {
        userRoles: {
          with: {
            role: true
          }
        }
      },
      orderBy: desc(users.id),
      limit: PAGE_SIZE + 1
    })

    const hasMore = userList.length > PAGE_SIZE
    if (hasMore) {
      userList = userList.slice(0, PAGE_SIZE)
    }

    const formattedUsers: UserWithRole[] = userList.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.userRoles[0]?.role.name || null
    }))

    return Response.json({
      users: formattedUsers,
      hasMore,
      total: formattedUsers.length
    })
  } catch (error) {
    console.error("Failed to fetch users list:", error)
    return Response.json(
      { error: "获取用户列表失败" },
      { status: 500 }
    )
  }
}
