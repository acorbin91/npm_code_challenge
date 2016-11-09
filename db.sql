-- -- Database: `node_challenge` -- -- 
-------------------------------------------------------- -- -- Table structure for 
table `tasks` -- CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `task_list_id` int(11) NOT NULL,
  `completed` enum('yes','no') NOT NULL DEFAULT 'no',
  `completed_date` datetime NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=latin1; -- 
-------------------------------------------------------- -- -- Table structure for 
table `task_lists` -- CREATE TABLE `task_lists` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(300) NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=latin1; -- 
-------------------------------------------------------- -- -- Table structure for 
table `users` -- CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `address` text NOT NULL,
  `birthdate` datetime NOT NULL,
  `created_at` datetime NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=latin1; -- -- Dumping 
data for table `users` -- INSERT INTO `users` (`id`, `name`, `address`, `birthdate`, 
`created_at`) VALUES (5, 'test', 'test', '2016-11-09 00:00:00', '0000-00-00 00:00:00'), 
(6, 'test', 'test', '2016-11-09 00:00:00', '0000-00-00 00:00:00'), (7, 'test', 'test', 
'2016-11-09 00:00:00', '0000-00-00 00:00:00'), (8, 'test', 'test', '2016-11-09 
00:00:00', '0000-00-00 00:00:00'); -- -- Indexes for dumped tables -- -- -- Indexes for 
table `tasks` -- ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`); -- -- Indexes for table `task_lists` -- ALTER TABLE 
`task_lists`
  ADD PRIMARY KEY (`id`); -- -- Indexes for table `users` -- ALTER TABLE `users`
  ADD PRIMARY KEY (`id`); -- -- AUTO_INCREMENT for dumped tables -- -- -- 
AUTO_INCREMENT for table `tasks` -- ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT; -- -- AUTO_INCREMENT for table 
`task_lists` -- ALTER TABLE `task_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT; -- -- AUTO_INCREMENT for table `users` 
-- ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9; /*!40101 SET 
CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */; /*!40101 SET 
CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */; /*!40101 SET 
COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
