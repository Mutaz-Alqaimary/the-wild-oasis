import supabase from "./supabase";

export async function getGuests() {
  const { data, error } = await supabase.from("guests").select("*");

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }

  return data;
}

export async function createEditGuest(newGuest, id) {
  // 1. Create/edit cabin
  let query = supabase.from("guests");

  // A) CREATE
  if (!id) query = query.insert([{ ...newGuest }]);

  // B) EDIT
  if (id) query = query.update({ ...newGuest }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Guest could not be ${id ? "edited" : "created"}`);
  }

  return data;
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be deleted");
  }

  return data;
}
