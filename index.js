import ReactDOM from 'react-dom';
import React from 'react';
import './index.css'

class AddTask extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskDesc : '',
        };
    }
    handleTaskTextClick(e){
        this.setState({
            taskDesc: e.target.value
        });
    }
    handleAddTaskClick(){
        this.props.handleToCollectorTaskInfo(this.state.taskDesc)
        this.setState({
            taskDesc: ''
        });
    }
    render(){
        
        return(
            <>
                <form>
                    <input type="text" value={this.state.taskDesc} onChange={(e)=> this.handleTaskTextClick(e)} />
                    <input type="button" value="Add Task" onClick={()=> this.handleAddTaskClick()}/>
                </form>
            </>
        )
    }
}
class TaskList extends React.Component{
    
    handleTaskClick(taskDesc){
        this.props.handleToDoTaskInfo(taskDesc);
    }
    render(){
        let list =[];
        for(let i = 0 ; i < this.props.tasks.length ;i++){
            let task = this.props.tasks[i];
            let spanAction;

            if(task.isFinished){
                spanAction = (
                    <span className='material-icons' onClick={()=> this.handleTaskClick(task.desc)}>close</span>
                )
            }else{
                spanAction = (
                    <span className='material-icons' onClick={()=> this.handleTaskClick(task.desc)}>done</span>
                )
            }
            let listItem = (
                <div key={i}>
                    <span>{task.desc}</span>
                    {spanAction}
                </div>
            );
            list.push(listItem);
        }
        return(
            <div className={this.props.forStyling}>
                <div className='list-container'>
                    <div className='title'>{this.props.purpose}</div>
                    <div className='content'>
                        {list}
                    </div>
                </div>
            </div>
        )
    }
}
class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tasks : [
                {
                    desc : 'Switching off lights',
                    isFinished : false           
                },{
                    desc : 'Studying',
                    isFinished : false
                },{
                    desc : 'Playing',
                    isFinished : true
                },{
                    desc : 'enjoyed',
                    isFinished : true
                }
            ]
        }
    }
    handleNewTask(taskdesc){
        let oldTasks = this.state.tasks.slice();
        oldTasks.push({
            desc: taskdesc,
            isFinished: false
        });
        this.setState({
            tasks: oldTasks
        })
    }
    handleTaskStatusUpdate(taskDesc,newStatus){
        let oldTasks= this.state.tasks.slice();

        let taskItem = oldTasks.find(ot => ot.desc === taskDesc)
        taskItem.isFinished = newStatus;

        this.setState({
            tasks: oldTasks
        })
    }
    render(){
        let task = this.state.tasks;
        let todoTasks = task.filter(t => t.isFinished === false);
        let doneTasks = task.filter(t => t.isFinished === true);
        return(
            <>

            <div className='add-task'>
                <AddTask handleToCollectorTaskInfo={(taskdesc)=>this.handleNewTask(taskdesc)}/>
            </div>
            <div className='task-lists'>
                <TaskList handleToDoTaskInfo={(taskDesc)=> this.handleTaskStatusUpdate(taskDesc,true)} tasks={todoTasks} purpose="Task to do" forStyling="todo"/>
                <TaskList handleToDoTaskInfo={(taskDesc)=> this.handleTaskStatusUpdate(taskDesc,false)} tasks={doneTasks} purpose="Finished Task" forStyling="finished"/>
            </div>
                
            </>
        );
    }
}
ReactDOM.render(<App />,document.getElementById("root"));
