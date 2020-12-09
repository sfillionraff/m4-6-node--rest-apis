# Cafe API Architecture Doc

## Details

There's a corner cafe that wants your help to propel itself into the digital age... The owner, Greg, has read extensively and is anxious to get started, but lacks the technical chops to get his digital transformation off the ground. He _knows_ that big data is the way to go. He is planning on tracking _everything_ in his cafe.

He needs a RESTful API to serve all of the data that he'll have and gather more! And he's asked a couple of future developers to architect this API for him. He wants to track _everything_ from the stock, the customers, the seating in the cafe.

Provide him with a series of REST endpoints that meet all, or most of the RESTful principles that you've just heard about! Your feedback will dictate how the database will eventually be built... no pressure.

Write out each endpoint, its method, and brief description of waht it should do.

| endpoint | method | Description            |
| -------- | ------ | ---------------------- |
| `/test`  | `GET`  | It is a test endpoint. |

_This activity is more about the discussion in how to best organize data endpoints. There will not be any coding._

## Your Answer

Endpoints:
STOCK-RELATED:
`/stock` : GET method | It returns the cafe's current stock.
`/stock/:id`: GET method | It returns the current stock for a particular item based on its ID
`/stock` : PATCH method | It allows you to update the stock (e.g. to add a new item or to make changes to an item)
`/stock/:id` : DELETE method | It allows you to remove a specific stock item

CUSTOMER-RELATED:
`/customers` : GET method | It returns the cafe's current customer list
`/customer/add/:id`: POST method | It adds a new customer to the customer list using their ID
`customer/:id` : GET method | It returns a specific customer based on their ID
`customer/:id`: PATCH method | It allows you to update the customer's information
`customer/:id`: DELETE method | It allows you to delete a customer from the list

DRINK-RELATED:
`/drinks`: GET method | It returns the drinks the cafe offers
`/drinks/:id` : GET method | It allows you to get a specific drink based on its ID
`/drinks/add/:id` : POST method | It allows you to add a new drink based on its ID
`/drinks/:id` : PATCH method | It allows you to update a specific drink
`/drinks/:id` : DELETE method | It allows you to delete a drink from the list
`/drinks/mostpopular` : GET method | It returns the most popular drinks in the cafe (based on how often they are ordered)

SEATING-RELATED:
`/seating`: GET method | It returns all of the possible seating options in the cafe
`/seating/:id`: GET method | It returns a specific seating option based on its ID
