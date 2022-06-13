export async function fetchPhase(groupId: number): Promise<GroupResponse> {

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
      return await response.json();
    }
  );

  return startgg_data;
}