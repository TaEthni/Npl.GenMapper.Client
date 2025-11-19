import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { EditUserConfig, EditUserDialogComponent } from '@npl-admin/dialogs/edit-user-dialog/edit-user-dialog.component';
import { EntityService } from '@npl-core/entity.service';
import { EntityType, User } from '@npl-data-access';

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
