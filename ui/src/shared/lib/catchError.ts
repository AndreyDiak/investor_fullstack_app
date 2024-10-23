export async function catchError<T>(
  promise: Promise<T>
): Promise<[undefined, T] | [Error]> {
  return await promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((e) => [e] as const);
}
