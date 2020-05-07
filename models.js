class user {
  email = '';
  name = '';
  role = ''; // [user | delivery]
  addresses = []; // only for role user
  storeId = ''; // only for role delivery
}

class Store {
  name = '';
  image = '';
  description = '';
  status = true; // in app get only active
  city = '';
  openTime = '08 AM';
  closeTim = '08 PM';
}

class Notification {
  id = '';
  category = 'Activity|Order|Chat'; //Event Type
  data = {};
  createdAt = 'timestamp';
  readTimestamp = '';
  to = '';
  senderId = '';
  title = '';
  body = '';
}
