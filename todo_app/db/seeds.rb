# This file should contain all the record creation needed to seed the database with its default values.

User.destroy_all
Todo.destroy_all

hans = User.create!(username: 'hans', email: 'hans@hans.com', password: 'hanshans')
Todo.create!(editor_data: {"blocks":[{"key":"as6h4","text":"This is a string of urgency","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"urgent":true,"quick":true}},{"key":"5irev","text":"and this is not","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":15,"style":"BOLD"}],"entityRanges":[],"data":{"urgent":false,"quick":false}}],"entityMap":{}}, user: hans)

puts "Added user and todo data to db"
