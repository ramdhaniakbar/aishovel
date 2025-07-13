import {supabase} from "@/lib/supabase";

async function getNews() {
  const { data, error } = await supabase
    .from('news')
    .select()

  if (error) {
    return null;
  }

  return data;
}

export {getNews};