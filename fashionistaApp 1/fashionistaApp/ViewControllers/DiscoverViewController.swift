//
//  DiscoverViewController.swift
//  fashionistaApp
//
//  Created by admin on 26/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit

class DiscoverViewController: UIViewController {

    var searchBar = UISearchBar()
    var users : [User] = []
    @IBOutlet weak var tableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        searchBar.delegate = self
        
        searchBar.searchBarStyle = .minimal
        searchBar.placeholder = "Search"
        searchBar.frame.size.width = view.frame.size.width - 60
        
        let searchItem = UIBarButtonItem(customView: searchBar)
        self.navigationItem.rightBarButtonItem = searchItem
        dosearch()
    }
    func dosearch() {
        if let searchText = searchBar.text?.lowercased() {
            self.users.removeAll()
            self.tableView.reloadData()
            API.User.QuaryUser(withText: searchText) { (user) in
                self.Isfollowing(userId: user.id!, completed: { (value) in
                    user.isfollowing = value
                    self.users.append(user)
                    self.tableView.reloadData()
                })
            }
        }
    }
    
    func Isfollowing(userId: String, completed: @escaping(Bool)->Void) {
        API.Follow.Isfollowing(userId: userId, completed: completed)
    }
}

extension DiscoverViewController: UISearchBarDelegate {
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
       dosearch()
    }
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        dosearch()
    }
}

extension DiscoverViewController: UITableViewDataSource {
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
