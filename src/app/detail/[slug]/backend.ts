import {supabase} from "@/lib/supabase";
interface Property {
    nama: string;
    definisi: string;
    tujuan: string;
    flowchart: string;
    quote: string;
    image: string[][];
  }
async function getDetail(vals: string) {
  const { data, error } = await supabase
    .from('ai_property')
    .select()
    .eq('id', vals).single();

  if (error) {
    return null;
  }
  const allImage = data.trials.Image.map((item: any) => [item[0], getImageUrl(item[1]), getImageUrl(item[2])]);
  const dataFormed: Property = {
    nama: data.nama,
    definisi: data.definisi,
    tujuan: data.tujuan,
    flowchart: data.flowchart,
    image: allImage,
    quote: data.quote
  }
  return dataFormed;
}
const getImageUrl =  (path: string) => {
  const { data } = supabase.storage.from('images').getPublicUrl(path);
  return data.publicUrl;
};
 
export {getDetail};