- Setup instructions

1. Install Dependencies: Run npm install to initialize and install the required npm packages.
2. Navigate to the Project Directory: Use cd client to move into the project directory.
3. Start the Project: Run npm start to launch the project.

- A brief project description and feature list:

I have created a food delivery app designed to offer a seamless and user-friendly experience for ordering food. It includes a variety of features such as an interactive cart system where users can add, remove, and adjust quantities of items, with automatic price updates. The app also provides a search function for easy product discovery, along with infinite scrolling and pagination for smooth browsing. A Bootstrap carousel is used to showcase featured items, and React Hot Toast notifications are implemented to alert users of actions such as successful orders. The app includes a login page where user information is securely stored in local storage. Additionally, the app offers a "scroll to top" button for easy navigation, displays order history after a purchase, and is fully responsive, ensuring an optimal experience across all devices.

- Challenges and limitations faced during development.

* API Issues: Initially, the API did not provide complete or accurate data (e.g., missing fields like photo, name, description, price). This required additional handling and fallback mechanisms to ensure proper functionality.

* Pagination Challenges: While implementing pagination, passing data through the Context API caused an infinite loop. This was resolved by utilizing useCallback and applying conditional checks to prevent unnecessary re-renders.

