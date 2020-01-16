import {Subscription} from 'rxjs';


export function AutoUnsubscribe(blackList = []) {
  return (constructor) => {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function() {
      for (let prop in this) {
        const property = this[prop];
        if (!blackList.includes(prop)) {
          if (property && typeof property === 'object' && property instanceof Subscription) {
            property.unsubscribe();
          }
        }
      }
      original && typeof original === 'function' && original.apply(this, arguments);
    };
  };
}
