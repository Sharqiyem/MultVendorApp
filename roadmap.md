# 1 REALESE V1.0 (5 April)

## 1.1 Customer App Section

[Done] Setup Push notification

[Done] Setup Localization

[Done] Setup Global Styling

[] Theming

[Done] UI design auth screens (register, login and forgot password)

[Done] Cart management (Add, remove items to cart and increase or decrese items)

[Done] Setup firebase

[Done] Fetch data from firebase using hook

[Done] Change fake data to firebase data [products, categories, stores]

[Done] Firebase Firestore

### Categories management

1. [Done] Get all categories
2. [Done] Get products by cat id (1h)

### Stores management

1. [Done] Get all stores
2. [Fix] Get categories by store id(0.5)
3. [Done] Get products by store id(0.5)

### Firebase Auth

1. [Done] register and login by email and pass
2. [V3.0] login by facebook
3. [V3.0] login by google

### Checkout

UI design Checkout screens

1. [Done]delivery address screen
2. [Done] UI - add new address screen and edit screen (2h)
3. [V2.0] logic location service (3h) (It took 2 days for map, auto complete address and config location)
4. [V2.0] get and save user addresses (2h)
5. [Done] payment screen

# 2 REALESE V2.0 (12 April)

3. [Done] logic location service (3h) (It took 2 days for map, auto complete address and config location)
4. [Done] save user addresses (2h)
5. [Done] get user saved addresses (2h)
6. [Done] edit user address (2h)

### Orders management

1.1. [Done] place order,

1.1.1 [Done] re order functionality (2h)

1.2. [Done] order details screen

1.3 [Done] order history screen (1h)

1.4 [Done] profile UI func
1.4.1 [Done] share app
1.4.1 [Done] rate app
1.4.1 [Done] contact us
1.4.1 [Done] about us
1.4.1 [Done] change language

# 3 REALESE V3.0 (18 April)

[Done] Fix orders [make order collection instead of user collection][some] Backend Localization

- stores and categories names (stores [name and description])
- categories and products [name]

## 3.1 Delivery App Section

[Done] user role 'delivery' for store {role: 'delivery', storeId:'2131' }
[Done] get orders for delivery by store id
[Done] List orders from manager,
[In] start delivery order,

Delivery Live Tracking

Stores Map View

## 3.2 Chats and contact

[Done] Chat between customer and delivery for selected order

## 3.3 Notifications

Notifications (Push notification and save them to FB and list them)
Notification {id, text, created date, is readed, sender id }

## 3.4 Sorting and Filtering

## 3.5 Ratings and reviews

# Issues

[Fixed] set tabBarVisible for some screens

# Ideas

1.1 Food delivery for one restaurant (- stores)
1.2 Food delivery (multi restaurant or families)
1.3 Services (Mahara) - there's some changes in pick maher
1.4 Mostaql (Like Mahara) - (stores -> mostaql)

for food families need two users (customer for ordering and chef who will manage menues, recive orders and change status (preparing order, in transit and delivered))
