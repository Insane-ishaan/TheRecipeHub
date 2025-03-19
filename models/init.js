const sampleData = [
  {
    avtar:{
      filename:"cardimage",
      url:"https://d25rq8gxcq0p71.cloudfront.net/dictionary-images/900/plate.jpg"
    },
    dishname: "Grilled Chicken Salad",
    protein: 30,
    msg: "A delicious grilled chicken salad with fresh greens and a tangy vinaigrette.",
    Ing: "Marinate the Chicken...Grill the Chicken...Prepare the Salad...Make the Dressing...Assemble the Salad..Serve",
    duration: 45,
    req: "2 boneless, skinless chicken breasts...2 tbsp olive oil...1 tsp garlic powder...1 tsp onion powder...1 1/2 tsp paprika...Salt and pepper to taste...Juice of 1 lemon",
  },
  {
    avtar:{
      filename:"cardimage",
      url:"https://d25rq8gxcq0p71.cloudfront.net/dictionary-images/900/plate.jpg"
    },
    dishname: "Vegetable Stir Fry",
    protein: 15,
    msg: "A healthy stir fry with a variety of colorful vegetables and a soy-based sauce.",
    Ing: "Prepare the Stir-Fry Sauce...Prepare the Vegetables..Stir-Fry the Vegetables...Serve...Assemble the Salad..Optional Garnishes",
    duration: 25,
    req: "2 tbsp olive oil...1 bell pepper, sliced...1 carrot, julienned...1 zucchini, sliced...1 cup broccoli florets...2 tbsp soy sauce...1 tsp ginger, grated...1 tsp garlic, minced...Salt and pepper to taste",
  },
  {
    avtar:{
      filename:"cardimage",
      url:"https://d25rq8gxcq0p71.cloudfront.net/dictionary-images/900/plate.jpg"
    },

    dishname: "Spaghetti Carbonara",
    protein: 25,
    msg: "Classic spaghetti carbonara with eggs, bacon, and Parmesan cheese.",
    Ing: "Cook the Pasta...Fry the Bacon...Prepare the Sauce...Combine Pasta and Sauce...Serve with Parmesan",
    duration: 30,
    req: "200g spaghetti...4 strips bacon, chopped...2 large eggs...50g Parmesan cheese, grated...Salt and pepper to taste...1 clove garlic, minced",
  },
  {
    avtar:{
      filename:"cardimage",
      url:"https://d25rq8gxcq0p71.cloudfront.net/dictionary-images/900/plate.jpg"
    },
    dishname: "Beef Tacos",
    protein: 35,
    msg: "Tasty beef tacos with fresh toppings and a spicy salsa.",
    Ing: "Cook the Beef...Prepare the Toppings...Warm the Tortillas...Assemble the Tacos...Serve",
    duration: 20,
    req: "500g ground beef...1 onion, chopped...1 tsp chili powder...1 tsp cumin...Salt and pepper to taste...Taco shells...Lettuce, shredded...Tomato, diced...Cheddar cheese, shredded...Sour cream",
  },
  {
    avtar:{
      filename:"cardimage",
      url:"https://d25rq8gxcq0p71.cloudfront.net/dictionary-images/900/plate.jpg"
    },
    dishname: "Lobster Bisque",
    protein: 40,
    msg: "A creamy lobster bisque with a rich, savory flavor.",
    Ing: "Prepare the Lobster...Make the Broth...Combine the Ingredients...Blend the Soup...Serve with Cream",
    duration: 75,
    req: "2 lobster tails...1 onion, chopped...2 celery stalks, chopped...2 carrots, chopped...4 cups seafood stock...1 cup heavy cream...2 tbsp butter...1 tbsp flour...1 tsp thyme...Salt and pepper to taste",
  },
  {
    avtar:{
      filename:"cardimage",
      url:"https://d25rq8gxcq0p71.cloudfront.net/dictionary-images/900/plate.jpg"
    },
    dishname: "Jambalaya",
    protein: 45,
    msg: "A New Orleans classic with shrimp, sausage, and chicken, all cooked in a flavorful rice mix.",
    Ing: "Cook the Sausage...Prepare the Shrimp and Chicken...Cook the Rice...Add the Seasonings...Combine Everything...Serve",
    duration: 60,
    req: "200g sausage, sliced...200g chicken breast, diced...200g shrimp, peeled and deveined...2 cups rice...1 onion, chopped...1 bell pepper, chopped...2 cloves garlic, minced...1 can diced tomatoes...1 tbsp paprika...1 tsp thyme...Salt and pepper to taste",
  },
  {
    avtar:{
      filename:"cardimage",
      url:"https://d25rq8gxcq0p71.cloudfront.net/dictionary-images/900/plate.jpg"
    },
    dishname: "Grilled Salmon with Asparagus",
    protein: 50,
    msg: "A healthy and flavorful grilled salmon served with crisp asparagus.",
    Ing: "Prepare the Salmon...Season the Asparagus...Grill the Salmon...Grill the Asparagus...Serve",
    duration: 30,
    req: "4 salmon fillets...1 bunch asparagus...2 tbsp olive oil...Salt and pepper to taste...Lemon wedges for serving",
  },
  {
    avtar:{
      filename:"cardimage",
      url:"https://d25rq8gxcq0p71.cloudfront.net/dictionary-images/900/plate.jpg"
    },
    dishname: "Beef Wellington",
    protein: 60,
    msg: "A luxurious beef Wellington with a tender beef center and a crispy pastry crust.",
    Ing: "Prepare the Beef...Prepare the Mushroom Duxelles...Wrap the Beef in Pastry...Bake the Wellington...Serve",
    duration: 120,
    req: "1kg beef tenderloin...1 pack puff pastry...200g mushrooms, finely chopped...1 tbsp Dijon mustard...1 egg, beaten...Salt and pepper to taste",
  },
  {
    avtar:{
      filename:"cardimage",
      url:"https://d25rq8gxcq0p71.cloudfront.net/dictionary-images/900/plate.jpg"
    },
    dishname: "Roast Chicken with Root Vegetables",
    protein: 55,
    msg: "A perfectly roasted chicken served with caramelized root vegetables.",
    Ing: "Prepare the Chicken...Season the Vegetables...Roast the Chicken and Vegetables...Serve",
    duration: 90,
    req: "1 whole chicken...4 carrots, peeled and cut...2 potatoes, peeled and cut...1 onion, quartered...2 tbsp olive oil...1 tbsp rosemary...Salt and pepper to taste",
  },
  {
    avtar:{
      filename:"cardimage",
      url:"https://d25rq8gxcq0p71.cloudfront.net/dictionary-images/900/plate.jpg"
    },
    dishname: "Mac and Cheese",
    protein: 20,
    msg: "Creamy macaroni and cheese with a crispy breadcrumb topping.",
    Ing: "Cook the Pasta...Make the Cheese Sauce...Combine Pasta and Sauce...Top with Breadcrumbs...Bake and Serve",
    duration: 40,
    req: "200g macaroni...2 cups cheddar cheese, shredded...1 cup milk...2 tbsp butter...1 tbsp flour...1/2 cup breadcrumbs...Salt and pepper to taste",
  },
];

module.exports = { data: sampleData };
