import {
  pgTable,
  varchar,
  uuid,
  text,
  timestamp,
  integer,
  pgEnum,
  bigint
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role",["admin","user"])

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role").notNull().default("user"),
  phone: bigint("phone", { mode: "number" }),
  address_line1: text("address_line1"),
  address_line2: text("address_line2"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  category: varchar("catgeory", { length: 100 }).notNull(),
  image: text("image").notNull(),
  rating_count: integer("rating_count").default(0),
  rating_rate: integer("rating_rate").default(0),
});

export const cartItems = pgTable("cartItems", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: uuid("productId")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  total: integer("total"),
  status: text("status").notNull(),
  paymentMethod: text("paymentMethod").notNull(),
  shippingName: text("shipping_name").notNull(),
  shippingPhone: text("shipping_phone").notNull(),
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const orderItems = pgTable("orderItems", {
  id: uuid("id").primaryKey().defaultRandom(),

  orderId: uuid("orderId")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),

  productId: uuid("productId")
    .notNull()
    .references(() => products.id),

  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
});


