import {supabase} from "@/lib/supabase";

async function getDetail(vals: string) {
  const { data, error } = await supabase
    .from('ai_property')
    .select()
    .eq('id', vals).single();

  if (error) {
    return null;
  }

  return data;
}

export {getDetail};