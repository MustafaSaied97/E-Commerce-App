# Responsive E-commerce-App is  made by react framework with routing, Hooks and state management using useContext ,
For styling using bootstrap, inline CSS  and icons using fontawesome

# I  used in this app mock server using json-server - tool put custom data and deploy this server in rerender.com after that  get the endpoint to make all crude operations, filtration, and others that I need in this app

#  used Cloud API from 'cloundinary.com' to store all pictures of all product so if admin want to add or edit a product by uploading a new picture of this product 

# the app is divided into four main sections :
	- Store:
	that have all products that came from the server
	and each product has a page called product details  and in it, you can order product 
	This section also is provided with a search bar with suggestions about products in the store when the user is starting writing  in the search bar  
	 and filter system to filter products in the store depending on category and price range

	- Admin :
	 that have features to add or edit or delete products from the store and put all changes to the server 
	
	- Login and signup form:
	  I provided this section with client-side and server-side validation
	  for the user that wants to store all data and activities about him on the server to be able whenever he wants to go to the store, he will see all data and  his activities as it is before he logged out

	(and I have in the store an anonymous user for the user that wants to make activities in the store without login but in this case, all data and activities about this user will be stored in local storage without saving it in the server)
	
	- shopping Cart:
	to store what the user adds of products 
	and each product in his cart have a page that has details about what activities is done in this product by the user and he can order product there
