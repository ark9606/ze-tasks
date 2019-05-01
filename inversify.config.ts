import { Container } from "inversify";
// import { TYPES, IState, StateClass } from "./src/controller/service/state/states";
import * as classes from "./src/controller/service/state/context";

const IocContainer = new Container();
// IocContainer.bind<classes.ServiceState>(TYPES.ServiceState).toSelf();
// IocContainer.bind<StateClass>(TYPES.StateClass).to(StateClass);

// IocContainer.bind<IState>(TYPES.IState).to(classes.ServiceState);

// IocContainer.bind<IState>(TYPES.IState).to(classes.NewState).whenTargetNamed('new');
// IocContainer.bind<classes.NewState>(TYPES.NewState).to(classes.NewState);
// IocContainer.bind<IState>(TYPES.ProcessingState).to(classes.ProcessingState);
// IocContainer.bind<IState>(TYPES.CloseState).to(classes.CloseState);
// IocContainer.bind<IState>(TYPES.DeployedState).to(classes.DeployedState);
// IocContainer.bind<IState>(TYPES.PendingState).to(classes.PendingState);
// IocContainer.bind<IState>(TYPES.RefundState).to(classes.RefundState);


export { IocContainer };