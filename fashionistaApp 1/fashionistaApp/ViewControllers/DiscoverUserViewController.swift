//
//  DiscoverUserViewController.swift
//  fashionistaApp
//
//  Created by admin on 06/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit

class DiscoverUserViewController: UIViewController {

    @IBOutlet weak var TableView: UITableView!
    
    var users : [User] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadUsers()
    }
    
    func loadUsers() {
            API.User.ObserveUsers { (user) in
                self.Isfollowing(userId: user.id!, completed: { (value) in
                    user.isfollowing = value
                    self.users.append(user)
                    self.TableView.reloadData()
                })
        }
    }
    
    func Isfollowing(userId: String, completed: @escaping(Bool)->Void) {
        API.Follow.Isfollowing(userId: userId, completed: completed)
    }
}

extension DiscoverUserViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return users.count
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "DiscoverUserTableViewCell", for: indexPath) as! DiscoverUserTableViewCell
        let user = users[indexPath.row]
        cell.user = user
        return cell
    }
}

