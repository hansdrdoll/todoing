# project_4

It’s a to-do app for people who prefer plain text editors over complex productivity apps. Manage your to-dos in a simple ui, with the assistance of an added layer of intelligence - intelligence that doesn't mess with you.

There’s two main components, the text editor on one larger side and the assistant pane on the other. 

You use the text editor the same as you would use a notepad - each task is its own line, and and you delete the line when you’re done. The app never modifies the notepad view, from the user's perspective it's static. The app would be synced, allowing you to view your list anywhere you can sign in.

Some users of plain text todo lists use formatting to indicate contextual information for themselves. For example, making a line italic could mean it's personal, or indenting the line with a tab could mean it's partially complete. The meaning of a formatting choice is only relevant to the specific user and not dictated by the app, the app would just allow you to filter your view by the formatting style. (ie view all italic lines)

Create lists within lists by writing a header in caps, and any task below that task until the next empty line break is considered to be grouped together.

The model handles assigning metadata to each entry: timestamps, styles the user has applied to text (like italic or bold), and hashtags written anywhere inline.

The assistant starts out as just a search bar. Tasks you delete from your list are still accessible in search but grayed out.

As your to-do list grows, the assistant can remind you of old tasks that may be buried towards the end of your list.

The assistant could show you what you added or removed from your list yesterday.

While you're typing a new line, it could surface other todo items you've made that share keywords like proper names.

An advanced feature could be that the app connects to your calendar for the purpose of seeing when you have unscheduled time. It could then say _“Hey, you have two hours on Friday between your 2pm meeting with Joe and your 5pm meeting with the team, do you want me to block that time off for you to get some stuff done?”_ If you say yes, the app would create an event on your calendar reserving that time. 

Another advanced feature could be a system of placing items into a meta-list of "do before I leave today," that you could generate by adding a character at the beginning of a line (like maybe a period). That list would appear in the assistant pane.
