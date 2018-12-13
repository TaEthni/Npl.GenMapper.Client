import { JoinListPipe } from './join-list.pipe';

describe('JoinListPipe', () => {
    it('create an instance', () => {
        const pipe = new JoinListPipe();
        expect(pipe).toBeTruthy();
    });

    it('should transform list to space separated array', () => {
        const pipe = new JoinListPipe();
        const list = ['1', '2', '3'];
        expect(pipe.transform(list)).toEqual('1 2 3');
    });
});
