export class DependencyContainer {
  private instances = new Map<string, any>();

  register<T>(name: string, instance: T): void {
    this.instances.set(name, instance);
  }

  resolve<T>(name: string): T {
    const instance = this.instances.get(name);

    if (!instance) {
      throw new Error(`${name} not found`);
    }

    return instance;
  }
}
