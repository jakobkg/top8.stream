export async function fetchPhase(phaseId: number): Promise<PhaseResponse> {

  const startgg_data: PhaseResponse = await fetch("https://startgg-api-proxy.jakobkg.workers.dev/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      phaseId: `${phaseId}`
    })
  }).then(
    async response => {
      return await response.json();
    }
  );

  return startgg_data;
}