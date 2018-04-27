# project_4

It’s a to-do app for people who prefer plain text editors over complex productivity apps. Manage your to-dos in a simple ui, with the assistance of an added layer of intelligence - intelligence that doesn't mess with you.

There’s three main components: in the notepad view, you have the text editor for inputing your todos on one larger side and an assistant pane on the other.

In the other view, you have a priority matrix. All the items you've inputted as todos become cards in a stack, and you drag them onto the matrix, like placing sticky notes.

#### Features:
- No learning curve: As a user who currently prefers plain text editors, the input features of this app are the same.
- Autosaved and synced anywhere you're logged in
- View your notes either in the notepad, or organize them in a priority matrix - then see scores applied to your

Use the text editor the same as you would use a notepad - __full keyboard control__, and all the same major shortcuts as any text editor. Each task is its own line, and and you delete the line when you’re done.

The app never modifies the notepad view, so from the user's perspective it's static. The app would be synced, allowing you to view your list anywhere you can sign in.

Some users of plain text todo lists use formatting to indicate contextual information for themselves. For example, making a line italic could mean it's personal, or indenting the line with a tab could mean it's partially complete. The meaning of a formatting choice is only relevant to the specific user and not dictated by the app, the app would just allow you to filter your view by the formatting style. (ie view all italic lines)

Create lists within lists by writing a header in caps, and any task below that task until the next empty line break is considered to be grouped together.

The model handles assigning metadata to each entry: timestamps, styles the user has applied to text (like italic or bold), and hashtags written anywhere inline.

The assistant starts out as just a search bar. Tasks you delete from your list are still accessible in search but grayed out.

As your to-do list grows, the assistant can remind you of old tasks that may be buried towards the end of your list.

The assistant could show you what you added or removed from your list yesterday.

While you're typing a new line, it could surface other todo items you've made that share keywords like proper names.

An advanced feature could be that the app connects to your calendar for the purpose of seeing when you have unscheduled time. It could then say _“Hey, you have two hours on Friday between your 2pm meeting with Joe and your 5pm meeting with the team, do you want me to block that time off for you to get some stuff done?”_ If you say yes, the app would create an event on your calendar reserving that time.

Another advanced feature could be a system of placing items into a meta-list of "do before I leave today," that you could generate by adding a character at the beginning of a line (like maybe a period). That list would appear in the assistant pane.


#### Technologies used:
- Ruby on Rails
- Devise
- React
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
-


#### Wireframes:

![Todo entry](https://git.generalassemb.ly/raw/hans/project_4/master/wireframes/Todo%20Entry.png)

![Priority Matrix](https://git.generalassemb.ly/raw/hans/project_4/master/wireframes/Priority%20Matrix.png)
