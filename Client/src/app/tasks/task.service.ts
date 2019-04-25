import { Injectable } from "@angular/core";
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';
import { catchError } from 'rxjs/operators';




@Injectable()
export class TaskService{
    private handleError:HandleError

    constructor(private http:HttpClient,httpErrorHandler:HttpErrorHandler){
        this.handleError = httpErrorHandler.createHandleError('TaskService')
    }

    getTask():Observable<Task[]>{
        return this.http
        .get<Task[]>('api/task')
        .pipe(catchError(this.handleError('getTasks',[])))
    }

    addTask(task:Task):Observable<Task>{
        return this.http
        .post<Task>('api/task',task)
        .pipe(catchError(this.handleError('addTasks',task)))
    }

    deleteTask(id:number):Observable<{}>{
        const url=`api/task/${id}`
        return this.http
        .delete(url)
        .pipe(catchError(this.handleError('deleteTask')))
    }

    updateTask(task:Task):Observable<Task>{
        return this.http
        .put<Task>(`api/task/${task.id}`,task)
        .pipe(catchError(this.handleError('updateTask',task)))
    }
}