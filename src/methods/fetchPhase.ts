export async function fetchPhase(groupId: number): Promise<GroupResponse | never> {

  const startgg_data: GroupResponse = await fetch("https://startgg-api-proxy.jakobkg.workers.dev/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      groupId: `${groupId}`
    })
  }).then(
    async response => {
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Got bad response from start.gg: ${response}`)
      }
    }
  );

  return startgg_data;
}