import supabase  from "../supabaseClient";

export const upsertProduct = async (product) => {
  try {
    // Step 1: Check if product already exists
    const { data: existingProduct, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("id", product.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("🔍 Fetch error:", fetchError.message);
      return null;
    }

    if (existingProduct) {
      console.log("🛠️ Product already exists. Updating...");
    } else {
      console.log("✨ Product does not exist. Creating new one...");
    }

    // Step 2: Now perform upsert
    const { data, error } = await supabase
      .from("products")
      .upsert([product])
      .select("*"); // ✅ Get the updated row

    if (error) {
      console.error("❌ Supabase upsert failed:", error.message);
      return null;
    }

    console.log("✅ Product upserted:", data);
    return data;
  } catch (err) {
    console.error("💥 Unexpected error:", err);
    return null;
  }
};