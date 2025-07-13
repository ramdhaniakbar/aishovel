import {supabase} from "@/lib/supabase";

async function getSearch() {
  const { data, error } = await supabase
    .from('ai_property')
    .select()

  if (error) {
    return null;
  }

  return data;
}

export {getSearch};