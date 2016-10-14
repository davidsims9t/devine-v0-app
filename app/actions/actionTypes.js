// Discovery feed
export const GET_FEED = 'GET_FEED'
export const GET_FEED_PENDING = 'GET_FEED_PENDING'
export const GET_FEED_FULFILLED = 'GET_FEED_FULFILLED'

// An individual feed item
export const GET_FEED_ITEM = 'GET_FEED_ITEM'
export const GET_FEED_ITEM_PENDING = 'GET_FEED_ITEM_PENDING'
export const GET_FEED_ITEM_FULFILLED = 'GET_FEED_ITEM_FULFILLED'

// Relational feed data
export const GET_FEED_RELATIONAL_DATA = 'GET_FEED_RELATIONAL_DATA'
export const GET_FEED_RELATIONAL_DATA_PENDING = 'GET_FEED_RELATIONAL_DATA_PENDING'
export const GET_FEED_RELATIONAL_DATA_FULFILLED = 'GET_FEED_RELATIONAL_DATA_FULFILLED'

// Subscription data from Pusher
export const GET_SUBSCRIPTION_DATA = 'GET_SUBSCRIPTION_DATA'
export const GET_SUBSCRIPTION_DATA_PENDING = 'GET_SUBSCRIPTION_DATA_PENDING'
export const GET_SUBSCRIPTION_DATA_FULFILLED = 'GET_SUBSCRIPTION_DATA_FULFILLED'

// Post a comment
export const POST_COMMENT = 'POST_COMMENT'
export const POST_COMMENT_PENDING = 'POST_COMMENT_PENDING'
export const POST_COMMENT_FULFILLED = 'POST_COMMENT_FULFILLED'

// Add comment to feed item
export const ADD_COMMENT_RELATION = 'ADD_COMMENT_RELATION'
export const ADD_COMMENT_RELATION_PENDING = 'ADD_COMMENT_RELATION_PENDING'
export const ADD_COMMENT_RELATION_FULFILLED = 'ADD_COMMENT_RELATION_FULFILLED'

// An individual user
export const GET_USER = 'GET_USER'
export const GET_USER_PENDING = 'GET_USER_PENDING'
export const GET_USER_FULFILLED = 'GET_USER_FULFILLED'

// Get the current user
export const GET_CURRENT_USER = 'GET_CURRENT_USER'
export const GET_CURRENT_USER_PENDING = 'GET_CURRENT_USER_PENDING'
export const GET_CURRENT_USER_FULFILLED = 'GET_CURRENT_USER_FULFILLED'

// Update feed stats
export const UPDATE_STATS = 'UPDATE_STATS'
export const UPDATE_STATS_PENDING = 'UPDATE_STATS_PENDING'
export const UPDATE_STATS_FULFILLED = 'UPDATE_STATS_FULFILLED'

// User sign-up
export const USER_SIGN_UP = 'GET_CURRENT_USER'
export const USER_SIGN_UP_PENDING = 'USER_SIGN_UP_PENDING'
export const USER_SIGN_UP_FULFILLED = 'USER_SIGN_UP_FULFILLED'

// User log-in or sign-up via Facebook
export const USER_FACEBOOK_LOG_IN = 'USER_FACEBOOK_LOG_IN'
export const USER_FACEBOOK_LOG_IN_PENDING = 'USER_FACEBOOK_LOG_IN_PENDING'
export const USER_FACEBOOK_LOG_IN_FULFILLED = 'USER_FACEBOOK_LOG_IN_FULFILLED'

// User notifications
export const GET_USER_NOTIFICATIONS = 'GET_USER_NOTIFICATIONS'
export const GET_USER_NOTIFICATIONS_PENDING = 'GET_USER_NOTIFICATIONS_PENDING'
export const GET_USER_NOTIFICATIONS_FULFILLED = 'GET_USER_NOTIFICATIONS_FULFILLED'

// Update user profile
export const PUT_USER = 'PUT_USER'
export const PUT_USER_PENDING = 'PUT_USER_PENDING'
export const PUT_USER_FULFILLED = 'PUT_USER_FULFILLED'

// Login
export const USER_LOG_IN = 'USER_LOG_IN'
export const USER_LOG_IN_PENDING = 'USER_LOG_IN_PENDING'
export const USER_LOG_IN_FULFILLED = 'USER_LOG_IN_FULFILLED'

// Send verification code
export const SEND_VERIFICATION_CODE = 'SEND_VERIFICATION_CODE'
export const SEND_VERIFICATION_CODE_PENDING = 'SEND_VERIFICATION_CODE_PENDING'
export const SEND_VERIFICATION_CODE_FULFILLED = 'SEND_VERIFICATION_CODE_FULFILLED'

// Reset password
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_PENDING = 'RESET_PASSWORD_PENDING'
export const RESET_PASSWORD_FULFILLED = 'RESET_PASSWORD_FULFILLED'

// Message conversations
export const GET_CONVERSATIONS = 'GET_CONVERSATIONS'
export const GET_CONVERSATIONS_PENDING = 'GET_CONVERSATIONS_PENDING'
export const GET_CONVERSATIONS_FULFILLED = 'GET_CONVERSATIONS_FULFILLED'

// Messages
export const GET_MESSAGES = 'GET_MESSAGES'
export const GET_MESSAGES_PENDING = 'GET_MESSAGES_PENDING'
export const GET_MESSAGES_FULFILLED = 'GET_MESSAGES_FULFILLED'

// Post push to registration
export const POST_PUSH_INSTALLATION = 'POST_PUSH_INSTALLATION'
export const POST_PUSH_INSTALLATION_PENDING = 'POST_PUSH_INSTALLATION_PENDING'
export const POST_PUSH_INSTALLATION_FULFILLED = 'POST_PUSH_INSTALLATION_FULFILLED'

// Update push to registration
export const PUT_PUSH_INSTALLATION = 'PUT_PUSH_INSTALLATION'
export const PUT_PUSH_INSTALLATION_PENDING = 'PUT_PUSH_INSTALLATION_PENDING'
export const PUT_PUSH_INSTALLATION_FULFILLED = 'PUT_PUSH_INSTALLATION_FULFILLED'

// Pusher subscription messages
export const GET_SUBSCRIPTION_MESSAGES = 'GET_SUBSCRIPTION_MESSAGES'
export const GET_SUBSCRIPTION_MESSAGES_PENDING = 'GET_SUBSCRIPTION_MESSAGES_PENDING'
export const GET_SUBSCRIPTION_MESSAGES_FULFILLED = 'GET_SUBSCRIPTION_MESSAGES_FULFILLED'

// Publish pusher message
export const PUBLISH_TO_CHANNEL = 'PUBLISH_TO_CHANNEL'
export const PUBLISH_TO_CHANNEL_PENDING = 'PUBLISH_TO_CHANNEL_PENDING'
export const PUBLISH_TO_CHANNEL_FULFILLED = 'PUBLISH_TO_CHANNEL_FULFILLED'

// Subscribe to channel
export const SUBSCRIBE_TO_CHANNEL = 'SUBSCRIBE_TO_CHANNEL'
export const SUBSCRIBE_TO_CHANNEL_PENDING = 'SUBSCRIBE_TO_CHANNEL_PENDING'
export const SUBSCRIBE_TO_CHANNEL_FULFILLED = 'SUBSCRIBE_TO_CHANNEL_FULFILLED'

// Unsubscribe from channel
export const UNSUBSCRIBE_FROM_CHANNEL = 'UNSUBSCRIBE_FROM_CHANNEL'
export const UNSUBSCRIBE_FROM_CHANNEL_PENDING = 'UNSUBSCRIBE_FROM_CHANNEL_PENDING'
export const UNSUBSCRIBE_FROM_CHANNEL_FULFILLED = 'UNSUBSCRIBE_FROM_CHANNEL_FULFILLED'

// Receive subscription data from channel
export const RECEIVE_SUBSCRIPTION_MESSAGES = 'RECEIVE_SUBSCRIPTION_MESSAGES'
export const RECEIVE_SUBSCRIPTION_MESSAGES_PENDING = 'RECEIVE_SUBSCRIPTION_MESSAGES_PENDING'
export const RECEIVE_SUBSCRIPTION_MESSAGES_FULFILLED = 'RECEIVE_SUBSCRIPTION_MESSAGES_FULFILLED'

// Get user-boutique relation
export const GET_USER_BOUTIQUE = 'GET_USER_BOUTIQUE'
export const GET_USER_BOUTIQUE_PENDING = 'GET_USER_BOUTIQUE_PENDING'
export const GET_USER_BOUTIQUE_FULFILLED = 'GET_USER_BOUTIQUE_FULFILLED'

// Post a new user-boutique relation
export const POST_USER_BOUTIQUE = 'POST_USER_BOUTIQUE'
export const POST_USER_BOUTIQUE_PENDING = 'POST_USER_BOUTIQUE_PENDING'
export const POST_USER_BOUTIQUE_FULFILLED = 'POST_USER_BOUTIQUE_FULFILLED'

// Update an existing user-boutique relation
export const PUT_USER_BOUTIQUE = 'PUT_USER_BOUTIQUE'
export const PUT_USER_BOUTIQUE_PENDING = 'PUT_USER_BOUTIQUE_PENDING'
export const PUT_USER_BOUTIQUE_FULFILLED = 'PUT_USER_BOUTIQUE_FULFILLED'

// Get boutique profile
export const GET_BOUTIQUE = 'GET_BOUTIQUE'
export const GET_BOUTIQUE_PENDING = 'GET_BOUTIQUE_PENDING'
export const GET_BOUTIQUE_FULFILLED = 'GET_BOUTIQUE_FULFILLED'

// Get search results
export const GET_SEARCH = 'GET_SEARCH'
export const GET_SEARCH_PENDING = 'GET_SEARCH_PENDING'
export const GET_SEARCH_FULFILLED = 'GET_SEARCH_FULFILLED'

// Get user notifications
export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS'
export const GET_NOTIFICATIONS_PENDING = 'GET_NOTIFICATIONS_PENDING'
export const GET_NOTIFICATIONS_FULFILLED = 'GET_NOTIFICATIONS_FULFILLED'

// Bulk update user notifications
export const PUT_NOTIFICATIONS = 'PUT_NOTIFICATIONS'
export const PUT_NOTIFICATIONS_PENDING = 'PUT_NOTIFICATIONS_PENDING'
export const PUT_NOTIFICATIONS_FULFILLED = 'PUT_NOTIFICATIONS_FULFILLED'