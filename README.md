# MarkovModel
Beer Model

- Front End: React.js
- Middle Tier: .Net Core/C#
- Back End: Microsoft SQL

# SUMMARY
The Markov (Beer) Model contains a simple Markov Chain that predicts future populations (or inventories) based on the current amounts, transition probabilities, and growth (or loss).  Sample data used for this model is fictional and in no way, shape, or form is meant to model behavior for real products.  The following features were developed for this project:

A Model Dashboard that depicts the current model probability matrix, a chart of predicted future states (population or inventories), and user options to add their own data for modeling.  The Model comes with two pre-populated data sets which are read only.  However, the user may create and modify their own models with are stored in a SQL database by their UserId.

A "More Info" Modal which provides detailed instructions on how to use the model and data validations therein.  Data validation is done through a combination of Yup and author generated logic.

A Manage Model Modal which enables the user to add, delete, and modify their model (names).

An Update Data Modal which allows the user to modify the product names, matrix size (3 - 6 products), change the transition probabilities, add growth (or loss), and determine the initial start states.

The main dashboard probabilities matrix automatically updates when the model is saved (updated).  Upon clicking "run model", the chart of future states is updated using the open source MIT Chart feature.  Future states are predicted out to 1,000 cycles based on user input for maximum cycles and the steady state precision.  The defaults for these values are 20 cycles and 0.5% or less change between cycles for all products included in the probability matrix.

# COMPONENTS
BeerModel.jsx as a Class Component
SingleBeer.jsx as a Function Component using Props
BeerChart.jsx as a Functional Component imported from MIT's "react-apexcharts"
BeerDataModal.jsx as a Functional Component using Props and Hooks
BeerDataCard.jsx as a Function Component using Formik and Yup
ManageModelModal.jsx as a Functional Component using Props and Hooks
MoreInfoModal.jsx as a Functional Component

# JavaScript Files
beerSchema.js using Yup
modelInstructions.js
beersService.js using AXIOS

# .NET
Domains include Beer and BeerModel
Requests include BeerUpdateRequest, BeersUpdateRequest, BeerModelAddRequest, and BeerModelUpdateRequest
Service methods include BeersService and BeerModelsService
Interfaces include IBeersService and IBeerModelsService
Controller is BeerAPIController
Simpletons are included in DependencyInjection

# SQL
Basic procedures for Adding, Deleting, Updating, and Selecting per proc names in .Net
User Defined Tables and Temporary Data Tables are utilized for batch insert and updating the probability data 
A User Defined Function is used to validate unique model names for each User Id
