import anthropic

client = anthropic.Anthropic(
    # defaults to os.environ.get("ANTHROPIC_API_KEY")
    api_key="my_api_key",
)

message = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=8192,
    temperature=0,
    system="# Context\n\nBetterUeveryday react app development: A personal development and habit tracking app that aims to help users build and maintain positive habits by providing an easy-to-use interface for daily task tracking, progress visualization, note taking, reminders, and more.\n\nYour task is to build a modern, sleek & intuitive app as per the user requests, iterating upon the code. \n\n# IMPORTANT: \nAlways provide the full code of the entire file, even when making small edits, the code you write will overwrite the contents of the given file so make sure to write it in full like recreating the file from scratch, so it can be quickly previewed & tested. Consider any missing info in the context of the conversation & ask for it needed before implementing the given changes. Use secure code per best practices.",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "great work so far, running with no issues . Lets start implementing one small change at a time. First lets add a navigation menu at the bottom, like most android or iphone apps have with meaningful icons to represent the different sections of the app. The nav should always stay visible regardless of whats displaying in the main area, like pinned at the bottom. These are the sections for the bottom nav:\n\n- home\n\n- news\n\n- A prominent '+' icon inside a circle in the middle of the nav, going over the heigth of the nav bar if possible. This will have special functionality when clicked, but i think we can discuss that that later? For now lets just get the basic nav bar, or let me know if we should do things in different order\n\n- ai coach\n\n- more' icon which opens contextual menu with these:\n - calendar \n - stats \n - community \n - collaboration \n - courses\n\nUse sleek icons to represent everything like all modern apps these days. Also everything should be responsive for any screen size but with a focus on phone screen size as thats how its meant to be used the most. Clicking each of this icons will display the corresponding section of the app in the main area, like regular websites feel when navigating i guess. Sounds good?"
                }
            ]
        },
        {
            "role": "assistant",
            "content": [
                {
                    "type": "text",
                    "text": "Let's break this down into steps:\n\n1. Install react-icons for the icons.\n2. Create a BottomNav component for the navigation bar.\n3. Add the navigation bar to the App component.\n4. Set up basic routing to display different sections when icons are clicked.\n\n## Step 1: Install react-icons\n\nFirst, you need to install the react-icons package. Run the following command in your project directory:\n\n```bash\nnpm install react-icons\n```\n\n## Step 2: Create the BottomNav Component\n\nCreate a new file `src/components/BottomNav.js` and add the following code:\n\n```jsx\nimport React from 'react';\nimport { FaHome, FaNewspaper, FaRobot, FaEllipsisH, FaPlusCircle } from 'react-icons/fa';\nimport { useNavigate } from 'react-router-dom';\n\nconst BottomNav = () => {\n  const navigate = useNavigate();\n\n  return (\n    <div className=\"fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center h-16\">\n      <FaHome size={24} onClick={() => navigate('/home')} />\n      <FaNewspaper size={24} onClick={() => navigate('/news')} />\n      <FaPlusCircle size={48} className=\"text-red-600\" onClick={() => navigate('/add')} />\n      <FaRobot size={24} onClick={() => navigate('/coach')} />\n      <FaEllipsisH size={24} onClick={() => navigate('/more')} />\n    </div>\n  );\n};\n\nexport default BottomNav;\n```\n\n## Step 3: Add the Navigation Bar to the App Component\n\nUpdate `src/App.js` to include the BottomNav component and set up basic routing:\n\n```jsx\nimport React, { useState } from 'react';\nimport { BrowserRouter as Router, Routes, Route } from 'react-router-dom';\nimport { Card, CardHeader, CardTitle, CardContent, CardFooter } from \"./components/ui/card\";\nimport { Input } from \"./components/ui/input\";\nimport { Button } from \"./components/ui/button\";\nimport TaskList from \"./TaskList\";\nimport BottomNav from './components/BottomNav';\n\nfunction App() {\n  const [isLoggedIn, setIsLoggedIn] = useState(false);\n  const [username, setUsername] = useState(\"\");\n  const [password, setPassword] = useState(\"\");\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    setIsLoggedIn(true);\n  };\n\n  if (isLoggedIn) {\n    return (\n      <Router>\n        <div className=\"min-h-screen bg-gray-100 pb-16\">\n          <header className=\"bg-red-600 text-white p-4 flex justify-between items-center\">\n            <h1 className=\"text-xl font-bold\">Task Manager</h1>\n            <Button className=\"text-white\" onClick={() => setIsLoggedIn(false)}>Logout</Button>\n          </header>\n          <div className=\"flex flex-col items-center justify-center p-4\">\n            <Routes>\n              <Route path=\"/home\" element={<Home />} />\n              <Route path=\"/news\" element={<News />} />\n              <Route path=\"/add\" element={<Add />} />\n              <Route path=\"/coach\" element={<Coach />} />\n              <Route path=\"/more\" element={<More />} />\n            </Routes>\n          </div>\n          <BottomNav />\n        </div>\n      </Router>\n    );\n  }\n\n  return (\n    <div className=\"flex items-center justify-center min-h-screen bg-gray-100\">\n      <Card className=\"w-[350px]\">\n        <CardHeader>\n          <CardTitle className=\"text-2xl font-bold text-center\">Login / Signup</CardTitle>\n        </CardHeader>\n        <CardContent>\n          <form onSubmit={handleSubmit} className=\"space-y-4\">\n            <div className=\"space-y-2\">\n              <Input\n                type=\"text\"\n                placeholder=\"Username\"\n                value={username}\n                onChange={(e) => setUsername(e.target.value)}\n                required\n                className=\"w-full\"\n              />\n            </div>\n            <div className=\"space-y-2\">\n              <Input\n                type=\"password\"\n                placeholder=\"Password\"\n                value={password}\n                onChange={(e) => setPassword(e.target.value)}\n                required\n                className=\"w-full\"\n              />\n            </div>\n            <Button type=\"submit\" className=\"w-full bg-red-600 hover:bg-red-700 text-white\">Submit</Button>\n          </form>\n        </CardContent>\n      </Card>\n    </div>\n  );\n}\n\nconst Home = () => <div>Home Section</div>;\nconst News = () => <div>News Section</div>;\nconst Add = () => <div>Add Section</div>;\nconst Coach = () => <div>AI Coach Section</div>;\nconst More = () => <div>More Section</div>;\n\nexport default App;\n```\n\n## Step 4: Set Up Basic Routing\n\nEnsure you have the react-router-dom package installed. If not, install it using:\n\n```bash\nnpm install react-router-dom\n```\n\nNow, your app should have a bottom navigation bar with icons that navigate to different sections. The Add section will be the placeholder for the special functionality you mentioned, which we can implement later.\n\n### Summary\n\n1. We installed react-icons for sleek icons.\n2. Created a BottomNav component for the navigation bar.\n3. Added the navigation bar to the App component.\n4. Set up basic routing to display different sections when icons are clicked.\n\nYou can now see the navigation bar at the bottom of the screen, and clicking on the icons will navigate to different sections. Let me know if you need any further modifications or if you have any questions!"
                }
            ]
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "running with no errors and displaying as expected for the record that the last code above this message is good in case we need to go back to it. And here's the last file tree to reflect the last changes for the record too:\n\nReplit-TailwindCSS-Template-Node-js\n├── public\n│   ├── favicon.ico\n│   ├── index.html\n│   ├── manifest.json\n│   └── out.css\n├── src\n│   ├── components\n│   │   ├── BottomNav.js\n│   │   └── ui\n│   │       ├── button.jsx\n│   │       ├── card.jsx\n│   │       └── input.jsx\n│   ├── lib\n│   │   └── utils.js\n│   ├── App.js\n│   ├── index.css\n│   ├── index.js\n│   ├── LoginSignupForm.js\n│   ├── Sidebar.js\n│   └── TaskList.js\n├── postcss.config.js\n├── README.md\n├── tailwind.config.js\n├── package-lock.json\n\nNext lets get the branding right. Lets try different icons style with thinner, more sleek outline, similar to most modern UI's these days, even windows 11 has great UI and icons as per common style in apps. also add small text below each icon for easy understanding."
                }
            ]
        },
        {
            "role": "assistant",
            "content": [
                {
                    "type": "text",
                    "text": "Certainly! I understand you want to update the icons to be more modern and sleek, with a thinner outline style, and add text labels beneath each icon. We'll use the `react-icons` library, specifically the `ri` (Remix Icon) set, which offers a more modern and sleek design. We'll also add text labels below each icon.\n\nLet's update the `BottomNav.js` component to reflect these changes:\n\n```jsx\nimport React from 'react';\nimport { RiHome5Line, RiNewspaperLine, RiRobotLine, RiMoreLine, RiAddCircleLine } from 'react-icons/ri';\nimport { useNavigate } from 'react-router-dom';\n\nconst BottomNav = () => {\n  const navigate = useNavigate();\n\n  const navItems = [\n    { icon: RiHome5Line, label: 'Home', path: '/home' },\n    { icon: RiNewspaperLine, label: 'News', path: '/news' },\n    { icon: RiAddCircleLine, label: 'Add', path: '/add' },\n    { icon: RiRobotLine, label: 'AI Coach', path: '/coach' },\n    { icon: RiMoreLine, label: 'More', path: '/more' },\n  ];\n\n  return (\n    <div className=\"fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center h-20 px-2\">\n      {navItems.map((item, index) => (\n        <div\n          key={index}\n          className={`flex flex-col items-center justify-center ${\n            item.label === 'Add' ? 'relative -top-4' : ''\n          }`}\n          onClick={() => navigate(item.path)}\n        >\n          <item.icon\n            size={item.label === 'Add' ? 48 : 24}\n            className={`${\n              item.label === 'Add' ? 'text-red-600' : 'text-gray-600'\n            } hover:text-red-600 transition-colors duration-200`}\n          />\n          <span className=\"text-xs mt-1 text-gray-600\">{item.label}</span>\n        </div>\n      ))}\n    </div>\n  );\n};\n\nexport default BottomNav;\n```\n\nThis updated version includes the following changes:\n\n1. We're now using the Remix Icon set (`ri`) from react-icons, which provides a more modern and sleek outline style.\n2. We've added text labels below each icon.\n3. The 'Add' button is now slightly larger and positioned above the others.\n4. We've increased the height of the nav bar to accommodate the labels.\n5. We've added hover effects to make the interface more interactive.\n\nNow, let's update the `App.js` file to adjust for the taller navigation bar:\n\n```jsx\nimport React, { useState } from 'react';\nimport { BrowserRouter as Router, Routes, Route } from 'react-router-dom';\nimport { Card, CardHeader, CardTitle, CardContent } from \"./components/ui/card\";\nimport { Input } from \"./components/ui/input\";\nimport { Button } from \"./components/ui/button\";\nimport BottomNav from './components/BottomNav';\n\nfunction App() {\n  const [isLoggedIn, setIsLoggedIn] = useState(false);\n  const [username, setUsername] = useState(\"\");\n  const [password, setPassword] = useState(\"\");\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    setIsLoggedIn(true);\n  };\n\n  if (isLoggedIn) {\n    return (\n      <Router>\n        <div className=\"min-h-screen bg-gray-100 pb-20\">\n          <header className=\"bg-red-600 text-white p-4 flex justify-between items-center\">\n            <h1 className=\"text-xl font-bold\">BetterUeveryday</h1>\n            <Button className=\"text-white\" onClick={() => setIsLoggedIn(false)}>Logout</Button>\n          </header>\n          <div className=\"flex flex-col items-center justify-center p-4\">\n            <Routes>\n              <Route path=\"/home\" element={<Home />} />\n              <Route path=\"/news\" element={<News />} />\n              <Route path=\"/add\" element={<Add />} />\n              <Route path=\"/coach\" element={<Coach />} />\n              <Route path=\"/more\" element={<More />} />\n            </Routes>\n          </div>\n          <BottomNav />\n        </div>\n      </Router>\n    );\n  }\n\n  return (\n    <div className=\"flex items-center justify-center min-h-screen bg-gray-100\">\n      <Card className=\"w-[350px]\">\n        <CardHeader>\n          <CardTitle className=\"text-2xl font-bold text-center\">Login / Signup</CardTitle>\n        </CardHeader>\n        <CardContent>\n          <form onSubmit={handleSubmit} className=\"space-y-4\">\n            <div className=\"space-y-2\">\n              <Input\n                type=\"text\"\n                placeholder=\"Username\"\n                value={username}\n                onChange={(e) => setUsername(e.target.value)}\n                required\n                className=\"w-full\"\n              />\n            </div>\n            <div className=\"space-y-2\">\n              <Input\n                type=\"password\"\n                placeholder=\"Password\"\n                value={password}\n                onChange={(e) => setPassword(e.target.value)}\n                required\n                className=\"w-full\"\n              />\n            </div>\n            <Button type=\"submit\" className=\"w-full bg-red-600 hover:bg-red-700 text-white\">Submit</Button>\n          </form>\n        </CardContent>\n      </Card>\n    </div>\n  );\n}\n\nconst Home = () => <div>Home Section</div>;\nconst News = () => <div>News Section</div>;\nconst Add = () => <div>Add Section</div>;\nconst Coach = () => <div>AI Coach Section</div>;\nconst More = () => <div>More Section</div>;\n\nexport default App;\n```\n\nThe main changes in `App.js` are:\n\n1. Increased the bottom padding of the main container to `pb-20` to accommodate the taller navigation bar.\n2. Updated the app title to \"BetterUeveryday\" in the header.\n\nThese changes should give you a more modern and sleek bottom navigation bar with text labels, while maintaining the overall structure and functionality of your app. The 'Add' button is now more prominent, sitting slightly above the other icons. Let me know if you want any further adjustments or if you have any questions!"
                }
            ]
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Much better style now! Here I just got a sketch from the client asking if we can make something like this & show a quick preview to see how it actually looks in real life. I really dont know how you'd like to go about this, you'll have to take full charge & use common practices to the extent of whatever is technically possible and let us know if anything can't be done or whatever might be. The color is more orangy not so red, for the header & bottom, so just do the colors like that in the bottom nav but leave that '+' like u did it, i love it like this going past above the actual height of the bar."
                },
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/jpeg",
                        "data": "<base64_encoded_image>"
                    }
                }
            ]
        },
        {
            "role": "assistant",
            "content": [
                {
                    "type": "text",
                    "text": "Certainly! I'll implement a design based on the sketch provided, incorporating the elements and style shown while maintaining the functionality we've already built. We'll need to make several changes to achieve this look. Let's break it down and implement the changes step by step.\n\n1. Update the color scheme to use an orange theme instead of red.\n2. Redesign the header to include the logo, search bar, and profile icon.\n3. Create a new component for the user profile section.\n4. Implement the task list with different types of tasks (habits, to-dos).\n5. Update the bottom navigation bar to match the sketch.\n\nLet's start by updating the necessary components:\n\n1. First, let's update the `tailwind.config.js` to include our new orange color:\n\n```javascript\nmodule.exports = {\n  content: [\n    \"./src/**/*.{js,jsx,ts,tsx}\",\n  ],\n  theme: {\n    extend: {\n      colors: {\n        'orange-main': '#FF5722',\n      },\n    },\n  },\n  plugins: [],\n}\n```\n\n2. Now, let's update the `App.js` file:\n\n```jsx\nimport React, { useState } from 'react';\nimport { BrowserRouter as Router, Routes, Route } from 'react-router-dom';\nimport { Card, CardHeader, CardTitle, CardContent } from \"./components/ui/card\";\nimport { Input } from \"./components/ui/input\";\nimport { Button } from \"./components/ui/button\";\nimport BottomNav from './components/BottomNav';\nimport Header from './components/Header';\nimport UserProfile from './components/UserProfile';\nimport TaskList from './components/TaskList';\n\nfunction App() {\n  const [isLoggedIn, setIsLoggedIn] = useState(false);\n  const [username, setUsername] = useState(\"\");\n  const [password, setPassword] = useState(\"\");\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    setIsLoggedIn(true);\n  };\n\n  if (isLoggedIn) {\n    return (\n      <Router>\n        <div className=\"min-h-screen bg-gray-100 pb-20\">\n          <Header />\n          <div className=\"flex flex-col items-center justify-center p-4\">\n            <Routes>\n              <Route path=\"/\" element={\n                <>\n                  <UserProfile />\n                  <TaskList />\n                </>\n              } />\n              <Route path=\"/news\" element={<div>News Section</div>} />\n              <Route path=\"/add\" element={<div>Add Section</div>} />\n              <Route path=\"/coach\" element={<div>AI Coach Section</div>} />\n              <Route path=\"/more\" element={<div>More Section</div>} />\n            </Routes>\n          </div>\n          <BottomNav />\n        </div>\n      </Router>\n    );\n  }\n\n  return (\n    <div className=\"flex items-center justify-center min-h-screen bg-gray-100\">\n      <Card className=\"w-[350px]\">\n        <CardHeader>\n          <CardTitle className=\"text-2xl font-bold text-center\">Login / Signup</CardTitle>\n        </CardHeader>\n        <CardContent>\n          <form onSubmit={handleSubmit} className=\"space-y-4\">\n            <div className=\"space-y-2\">\n              <Input\n                type=\"text\"\n                placeholder=\"Username\"\n                value={username}\n                onChange={(e) => setUsername(e.target.value)}\n                required\n                className=\"w-full\"\n              />\n            </div>\n            <div className=\"space-y-2\">\n              <Input\n                type=\"password\"\n                placeholder=\"Password\"\n                value={password}\n                onChange={(e) => setPassword(e.target.value)}\n                required\n                className=\"w-full\"\n              />\n            </div>\n            <Button type=\"submit\" className=\"w-full bg-orange-main hover:bg-orange-700 text-white\">Submit</Button>\n          </form>\n        </CardContent>\n      </Card>\n    </div>\n  );\n}\n\nexport default App;\n```\n\n3. Create a new `Header.js` component:\n\n```jsx\nimport React from 'react';\nimport { RiSearchLine, RiUser3Line } from 'react-icons/ri';\n\nconst Header = () => {\n  return (\n    <header className=\"bg-orange-main text-white p-4 flex justify-between items-center\">\n      <div className=\"flex items-center\">\n        <RiUser3Line size={24} className=\"mr-2\" />\n        <h1 className=\"text-xl font-bold\">BetterYou Everyday</h1>\n      </div>\n      <div className=\"flex items-center\">\n        <div className=\"relative mr-4\">\n          <input\n            type=\"text\"\n            placeholder=\"Search\"\n            className=\"bg-white bg-opacity-20 text-white placeholder-white pl-8 pr-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white\"\n          />\n          <RiSearchLine className=\"absolute left-2 top-1/2 transform -translate-y-1/2 text-white\" />\n        </div>\n        <RiUser3Line size={24} />\n      </div>\n    </header>\n  );\n};\n\nexport default Header;\n```\n\n4. Create a new `UserProfile.js` component:\n\n```jsx\nimport React from 'react';\n\nconst UserProfile = () => {\n  return (\n    <div className=\"w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden mb-4\">\n      <div className=\"bg-orange-main text-white p-4 flex flex-col items-center\">\n        <div className=\"w-24 h-24 bg-white rounded-full mb-2\"></div>\n        <h2 className=\"text-xl font-bold\">John Doe</h2>\n      </div>\n      <div className=\"p-4 text-center\">\n        <p className=\"text-gray-600\">13 out of 20 Today</p>\n      </div>\n    </div>\n  );\n};\n\nexport default UserProfile;\n```\n\n5. Update the `TaskList.js` component:\n\n```jsx\nimport React from 'react';\nimport { RiCheckLine, RiMoreLine } from 'react-icons/ri';\n\nconst TaskItem = ({ type, title, icons }) => {\n  const borderColor = type === 'habit' ? 'border-orange-300' : 'border-blue-300';\n  const labelColor = type === 'habit' ? 'text-orange-main' : 'text-blue-500';\n\n  return (\n    <div className={`flex items-center justify-between p-3 border-l-4 ${borderColor} bg-white rounded-lg shadow-sm mb-2`}>\n      <div className=\"flex items-center\">\n        <RiCheckLine className=\"text-green-500 mr-2\" />\n        <div>\n          <span className={`text-xs font-semibold uppercase ${labelColor}`}>{type}</span>\n          <p className=\"font-medium\">{title}</p>\n        </div>\n      </div>\n      <div className=\"flex items-center\">\n        {icons && icons.map((Icon, index) => (\n          <Icon key={index} className=\"ml-1 text-gray-400\" />\n        ))}\n        <RiMoreLine className=\"ml-2 text-gray-400\" />\n      </div>\n    </div>\n  );\n};\n\nconst TaskList = () => {\n  return (\n    <div className=\"w-full max-w-md\">\n      <TaskItem type=\"habit\" title=\"Eat healthy\" />\n      <TaskItem type=\"habit\" title=\"No junk food\" />\n      <TaskItem type=\"to-do\" title=\"Take out rubbish\" />\n    </div>\n  );\n};\n\nexport default TaskList;\n```\n\n6. Update the `BottomNav.js` component:\n\n```jsx\nimport React from 'react';\nimport { RiHome5Line, RiNewspaperLine, RiRobotLine, RiMoreLine, RiAddCircleLine } from 'react-icons/ri';\nimport { useNavigate } from 'react-router-dom';\n\nconst BottomNav = () => {\n  const navigate = useNavigate();\n\n  const navItems = [\n    { icon: RiHome5Line, label: 'Home', path: '/' },\n    { icon: RiNewspaperLine, label: 'News', path: '/news' },\n    { icon: RiAddCircleLine, label: 'Add', path: '/add' },\n    { icon: RiRobotLine, label: 'AI Coach', path: '/coach' },\n    { icon: RiMoreLine, label: 'More', path: '/more' },\n  ];\n\n  return (\n    <div className=\"fixed bottom-0 left-0 right-0 bg-orange-main shadow-lg flex justify-around items-center h-20 px-2\">\n      {navItems.map((item, index) => (\n        <div\n          key={index}\n          className={`flex flex-col items-center justify-center ${\n            item.label === 'Add' ? 'relative -top-4' : ''\n          }`}\n          onClick={() => navigate(item.path)}\n        >\n          <item.icon\n            size={item.label === 'Add' ? 48 : 24}\n            className={`${\n              item.label === 'Add' ? 'text-white' : 'text-white'\n            } hover:text-gray-200 transition-colors duration-200`}\n          />\n          <span className=\"text-xs mt-1 text-white\">{item.label}</span>\n        </div>\n      ))}\n    </div>\n  );\n};\n\nexport default BottomNav;\n```\n\nThese changes should create a layout very similar to the sketch provided. The app now has:\n\n1. An orange theme\n2. A redesigned header with a logo, search bar, and profile icon\n3. A user profile section with a placeholder avatar and progress\n4. A task list with different types of tasks (habits and to-dos)\n5. An updated bottom navigation bar that matches the sketch\n\nThe \"+\" button in the bottom nav still extends above the nav bar as you requested. \n\nNote that some elements (like specific icons for tasks) are placeholder implementations. You may need to add more detailed icons or functionality as needed.\n\nTo see this in action, you'll need to update your imports in the `App.js` file and ensure all the new components are in the correct directories. Let me know if you need any further adjustments or have any questions!"
                }
            ]
        }
    ],
    extra_headers={
        "anthropic-beta": "max-tokens-3-5-sonnet-2024-07-15"
    }
)
print(message.content)






def react_dev_assistant(user_input, optimized_history):
    system_prompt = f"""
    You are an AI assistant specializing in React development. Your task is to assist in building a React application based on user requirements. Here's the current context of the project:

    {optimized_history}

    Please provide code and explanations based on the user's input, always outputting full file contents when making changes.
    """

    message = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=4000,
        temperature=0,
        system=system_prompt,
        messages=[
            {"role": "user", "content": user_input}
        ]
    )

    return message.content


client = anthropic.Anthropic(api_key="your_api_key_here")

def optimize_conversation(conversation_history):
    system_prompt = """
    You are an AI assistant specializing in summarizing and optimizing conversation histories. Your task is to:
    1. Review the given conversation history.
    2. Remove any redundant or duplicate information.
    3. Summarize key points and decisions made.
    4. Maintain critical context necessary for understanding the current state of the project.
    5. Preserve the latest working code snippets and file structure information.
    6. Optimize the conversation to be as concise as possible while retaining all crucial information.
    7. Format the output in a clear, structured manner that's easy for an AI to parse and understand.
    """

    message = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=4000,
        temperature=0,
        system=system_prompt,
        messages=[
            {"role": "user", "content": f"Here's the conversation history to optimize:\n\n{conversation_history}"}
        ]
    )

    return message.content












import os

# Replace with your actual API key
ANTHROPIC_API_KEY = "YOUR_ANTHROPIC_API_KEY"

def read_file(filename):
  """Reads the contents of a file."""
  with open(filename, "r") as f:
    return f.read()

def write_file(filename, content):
  """Writes content to a file."""
  with open(filename, "w") as f:
    f.write(content)

def list_files():
  """Returns a list of all files in the project directory."""
  return os.listdir()
