const modelInstruction = {
    dataInstruction: "Enter the Name, Initial Count, transition probabilities, and growth. Row probabilities allow for 4 decimal places and must add to 1. Initial Counts less than 1 will be excluded from the Model.",
    modelInformation1: "The Beer Model uses a Markov Chain to predict future beer drinking inventories based on the initial population, transition probabilities, and growth where the future Inventory (n+1) equals the current Inventory (n) multiplied by the Transpose [-1] of the Probability Matrix P(x), plus growth.",
    modelInformation2: "The Model accepts up to 6 different beverages and includes two pre-populated static examples, one using three common beer brands with no growth and the second with six beverages, including growth and loss (represented by negative growth).",
    modelInformation3: "The home screen defaults to Example 1 and displays the probability matrix on the left side using percentages. The default 20-year prediction chart is on the right.",
    modelInformation4: "At the bottom of the home screen, the user can select Example 1, Example 2, or user-defined (previously saved) models.",
    modelInformation5: "By clicking Manage Model, the user can change the name of a user-defined model, delete a user-defined model, or insert a new model.  Each model name must be unique for that user.",
    modelInformation6: "By clicking Update Data, the user can toggle the product matrix between 3 - 6 products, modify the beer names, change the starting inventory (Initial Count), enter transition probabilities P(x), and add growth (or loss).",
    modelInformation7: "Toggling the product matrix to a smaller sized matrix automatically resets the model data for the newly hidden cells to the identity matrix with no inventory and no growth.",
    modelInformation8: "The beer names can be up to 10 alpha or 25 numeric characters.",
    modelInformation9: "The Initial Inventory cannot be negative and must be a positive integer for inclusion in the home page data table and chart.  The maximum inventory and growth is approximately one billion.",
    modelInformation10: "Each probability must be between 0 and 1 and each row must add to 1.  Probabilities are rounded to 4 decimal places.",
    modelInformation11: "Upon clicking Update, the beer names, initial inventory, transition probabilities, and growth are saved to a database, if they pass the before mentioned data validation checks.  A warning is displayed if it fails a validation check with the reason it failed.",
    modelInformation12: "After successfully updating the model data, the user is returned to the home screen where they may update the Steady State precision and Maximum Cycles.",
    modelInformation13: "The Steady State default is 0.005 representing an inventory change of less than 0.5% for each beer between cycles as as model termination criteria. The Steady State range is between 0 - 15% with a default of 0.5%. The Maximum Cycles must be a positive integer between 1 and 1000.",
    modelInformation14: "After clicking Run Model, the markov time series model terminates when either the Steady State criteria or Maximum Cycles is reached and then displays the results via the Chart.",
    modelInformation15: "The icons in the upper right corner of the chart allow the user to zoom in/out of the graph and also to download the data.",
};

export default modelInstruction;