# Overview
In building this project my purpose was to learn how to build a web app using React.


This is an e-commerce app that sells spatulas. It has a products page with cards that include an image, description, and an 'Add to Cart' button. The home page has a shopping cart icon that shows the count of product in the cart and is a working link to the shopping cart page. The shopping cart page shows a list of items added to the cards with images and prices. There is a quantity button to add more of an item on each card. There is a running subtotal in the summary section. There is a checkout button that directs the user to a secure payment site. When payment is made and successful the user is redirected to a success checkout page. The app gets its products from a mongoDB cluster. To start the app in the terminal from the navigate to backend and type npm run dev then open another terminal and navigate to the frontend. Then type npm run dev and go to the localhost 5173.

The purpose for writing this software was to learn how to use the React libraries, along with Node.js, Express to create a server, MongoDB to get data, and Stripe to create a secure payment service.

{Provide a link to your YouTube demonstration.  It should be a 4-5 minute demo of the software running (starting the server and navigating through the web pages) and a walkthrough of the code.}

[Software Demo Video](https://youtu.be/s4IIjLSmE0w)

# Web Pages
The Home page has navigation to the products page and the shopping-cart page. It has working links to instagram and facebook. The shopping cart count is dynamically created using a context. The Products page is dynamically created using data from a MongoDB cluster that was seeded. It is created using a product card component to create the layout of the card and a product list component that makes a call to the backend which fetches the data from MongoDB. Then the list is iterated through using .map to create the cards seen on the product page. The shopping-cart page shows a list of products added to the cart when the user clicks the "Add to Cart" button on the product card in the products page. The list of products on the shopping-cart page shows a smaller thumbnail picture of the product with a quantity input to add more of the product. This is done dynamically. There is also a summary page which keeps a running sub-total of items in the cart. At the bottom of the section there is a checkout button which redirects the user to a secure stripe payment site. When the payment is successful the user is redirected to a checkout success page.
# Development Environment

{Describe the tools that you used to develop the software}
Tools used for this app are:
React
Node.js
Express
Stripe
Axios
Vite

The programming languages used are:
jsx
css
JavaScript

# Useful Websites
* [geekforgeeks](https://www.geeksforgeeks.org/reactjs/shopping-cart-app-using-react/)
* [react.dev](https://react.dev/learn/creating-a-react-app)
* [freecodecamp](https://www.freecodecamp.org/news/react-stripe-payments/)
* [Medium.com](https://medium.com/better-programming/how-to-use-stripe-in-react-js-c209d0541fb4)
* [AngularMinds](https://www.angularminds.com/blog/integrating-secure-payment-gateways-in-reacte)
* [YouTube](https://www.youtube.com/watch?v=v8B3CGG0KtI)
* [reddit.com](https://www.reddit.com/r/react/comments/pykwb3/fullstack_ecommerce_app_using_react_nodejs/)



# Future Work
* In the final checkout I would like to add shipping and tax to be calculated into the total.
* I would also like to add a cluster to MongoDB to post successful order information
* I would also like to make this application responsive.
