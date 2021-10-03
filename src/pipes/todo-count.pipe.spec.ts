import { TodoCountPipe } from './todo-count.pipe';

describe('TodoCountPipe', () => {
  it('create an instance', () => {
    const pipe = new TodoCountPipe();
    expect(pipe).toBeTruthy();
  });
});
