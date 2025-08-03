import axios from "axios";
const token = process.env.NEXT_PUBLIC_GitHube_Token;
export const getrepo = async () => {
  try {
    const data = axios.get("https://api.github.com/repos/hamza-trckous", {
      headers: {
        Authorization: `token ${token}`
      }
    });
    return data;
  } catch (error) {
    console.error("❌ Error fetching commits:", error);
    return null;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/graphql",
      {
        query: `
        {
          products {
           
            name
         
          }
        }
      `
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Products:", response.data.data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
