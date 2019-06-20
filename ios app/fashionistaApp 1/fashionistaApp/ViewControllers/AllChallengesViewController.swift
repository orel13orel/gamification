//
//  AllChallengesViewController.swift
//  fashionistaApp
//
//  Created by admin on 17/06/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
import FirebaseDatabase
import  FirebaseAuth

struct cellData1 {
    var opened = Bool()
    var title = String()
    var sectionData = [String]()
}

class AllChallengesViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    @IBOutlet weak var tableView: UITableView!
    var Ref_Challenges = Database.database().reference().child("Challenge")
    var Ref_Context = Database.database().reference().child("Context")
    var ChallengeData = [String]()
    var tableViewData = [cellData1]()

    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.delegate = self
        tableView.dataSource = self
        
        
        self.Ref_Challenges.observe(.value) { (snapshot4) in
        //    for userId in (snapshot4.children) {
                let emunetor = snapshot4.children
                while let rest = emunetor.nextObject() as? DataSnapshot {
                     let x = self.Ref_Challenges.child(rest.key)
                    x.observeSingleEvent(of: .value, with: { (snapshot10) in
                        if snapshot10.hasChild("name") && snapshot10.hasChild("start_time") && snapshot10.hasChild("end_time") {
                            if snapshot10.hasChild("Actions") {
                                
                                let challName = snapshot10.childSnapshot(forPath: "name").value
                                let start  = snapshot10.childSnapshot(forPath: "start_time").value
                                let end = snapshot10.childSnapshot(forPath: "end_time").value
                                let pts = snapshot10.childSnapshot(forPath: "points").value
                                let Ref_challenge = self.Ref_Challenges.child(rest.key).child("Actions")
                                
                                
                                self.Ref_Context.observeSingleEvent(of: .value, with: { (snapshot7) in
                                    var hashmap : [String:String]=[:];
                                    for rest1 in snapshot7.children {
                                        let snap = rest1 as! DataSnapshot
                                        print("snap",snap)
                                        print("snap.childSnapshot(forPath: Action)",snap.childSnapshot(forPath: "Action"))
                                        let snap1 :[String:Any?] = snap.childSnapshot(forPath: "Action").value as! [String:Any?]
                                        for dic in snap1{
                                            let base = dic.value as! [String:Any?]
                                            hashmap.updateValue(base["name"] as! String, forKey: dic.key)
                                        }
                                    }
                                    
                                    
                                    Ref_challenge.observeSingleEvent(of: .value, with: { (snapshot5) in
                                        var array:[String]=[];
                                        array.append("Start time: \(start!)")
                                        array.append("End time: \(end!)")
                                        array.append("Points: \(pts!)")
                                        for userid3 in snapshot5.children {
                                            let challsnap1 = userid3 as! DataSnapshot
                                            let challdict1 = challsnap1.value as! [String: String?]
                                            array.append("Amount: \(challdict1["amount"]!!)")
                                            let actionname = hashmap[challdict1["action_id"]!!]
                                            if (actionname != nil){
                                                array.append("Action: \(actionname!)")
                                            }
                                            
                                        }
                                        self.tableViewData.append(cellData1(opened: false, title: challName! as! String, sectionData:array))
                                        self.tableView.reloadData()
                                    })
                                })
                                
                            }
                        }
                    })
              //  }
            }
            
        }
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return tableViewData.count
    }
   
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if tableViewData[section].opened == true {
            return tableViewData[section].sectionData.count + 1
        } else {
            return 1
        }
        
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let dataIndex = indexPath.row - 1
        if indexPath.row == 0 {
            guard let cell = tableView.dequeueReusableCell(withIdentifier: "AllChallengesTableViewCell") else { return UITableViewCell() }
            cell.textLabel?.text = tableViewData[indexPath.section].title
            
            
            return cell
        } else {
            guard let cell = tableView.dequeueReusableCell(withIdentifier: "AllChallengesTableViewCell") else { return UITableViewCell() }
            cell.textLabel?.text = tableViewData[indexPath.section].sectionData[dataIndex]
            return cell
        }
    }
    
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if tableViewData[indexPath.section].opened == true {
            tableViewData[indexPath.section].opened = false
            let sections = IndexSet.init(integer: indexPath.section)
            tableView.reloadSections(sections, with: .none)
        } else {
            tableViewData[indexPath.section].opened = true
            let sections = IndexSet.init(integer: indexPath.section)
            tableView.reloadSections(sections, with: .none)
        }
    }
    

}
