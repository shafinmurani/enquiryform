export class master {
  timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
}
