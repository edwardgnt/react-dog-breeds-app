export function breedNameToUrl(name: string): string {
  return name
    .toLowerCase()
    .replace(/ /g, "")        
    .replace(/[^a-z]/g, "");  
}
