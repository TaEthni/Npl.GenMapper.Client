import { EditUserConfig, EditUserDialogComponent } from '@admin/dialogs/edit-user-dialog/edit-user-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EntityService } from '@core/entity.service';
import { EntityType } from '@models/entity.model';
import { User } from '@models/user.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    public users: User[];
    public dataSource = new MatTableDataSource<User>();
    public displayedColumns: string[] = ['id', 'email', 'username', 'role', 'actions'];

    @ViewChild(MatPaginator, { static: true })
    public paginator: MatPaginator;

    @ViewChild(MatSort, { static: true })
    public sort: MatSort;

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private entityService: EntityService
    ) { }

    public ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loadUsers();
    }

    public editUser(user: User): void {
        this.dialog
            .open<EditUserDialogComponent, EditUserConfig, User>(
                EditUserDialogComponent, {
                data: {
                    user,
                }
            }
            )
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this._editUser(result);
                }
            });
    }

    public applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    private loadUsers(): void {
        this.entityService.getAll<User>(EntityType.Users).subscribe(result => {
            this.users = result;
            this.dataSource.data = this.users;
        });
    }

    private _editUser(user: User): void {
        this.entityService.update<User>(user).subscribe(result => {
            this.loadUsers();
            this.snackBar.open('You have successfully saved the User', 'Ok', { duration: 10000 });
        });
    }
}
